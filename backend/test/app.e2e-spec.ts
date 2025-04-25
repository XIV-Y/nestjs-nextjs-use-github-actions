import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('ユーザーの完全なCRUDフロー', async () => {
    // 1. ユーザーの作成
    const createResponse = await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'E2E Test User',
        email: 'e2e@example.com',
        password: 'password123',
      })
      .expect(201);

    const userId = createResponse.body.id;
    expect(createResponse.body.name).toBe('E2E Test User');
    expect(createResponse.body.email).toBe('e2e@example.com');

    // 2. 全ユーザーの取得
    const getAllResponse = await request(app.getHttpServer())
      .get('/users')
      .expect(200);

    expect(Array.isArray(getAllResponse.body)).toBe(true);
    expect(getAllResponse.body.some((user) => user.id === userId)).toBe(true);

    // 3. 特定ユーザーの取得
    const getOneResponse = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .expect(200);

    expect(getOneResponse.body.id).toBe(userId);
    expect(getOneResponse.body.name).toBe('E2E Test User');

    // 4. ユーザーの更新
    const updateResponse = await request(app.getHttpServer())
      .patch(`/users/${userId}`)
      .send({
        name: 'Updated E2E User',
      })
      .expect(200);

    expect(updateResponse.body.id).toBe(userId);
    expect(updateResponse.body.name).toBe('Updated E2E User');
    expect(updateResponse.body.email).toBe('e2e@example.com');

    // 5. ユーザーの削除
    await request(app.getHttpServer()).delete(`/users/${userId}`).expect(200);

    // 6. 削除されたことを確認
    await request(app.getHttpServer()).get(`/users/${userId}`).expect(404);
  });
});
