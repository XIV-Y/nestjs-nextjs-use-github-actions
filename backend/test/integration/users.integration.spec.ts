import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/src/app.module';

describe('UsersController (Integration)', () => {
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

  const user = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  };

  let userId: number;

  describe('POST /users', () => {
    it('should create a new user', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send(user)
        .expect(201)
        .then((response) => {
          expect(response.body).toHaveProperty('id');
          expect(response.body.name).toBe(user.name);
          expect(response.body.email).toBe(user.email);
          expect(response.body.password).toBe(user.password);
          userId = response.body.id;
        });
    });

    it('should throw validation error with invalid email', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          ...user,
          email: 'not-an-email',
        })
        .expect(400);
    });

    it('should throw validation error with short password', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          ...user,
          password: '12345', // 6文字未満
        })
        .expect(400);
    });
  });

  describe('GET /users', () => {
    it('should return an array of users', () => {
      return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBe(true);
          expect(response.body.length).toBeGreaterThan(0);
        });
    });
  });

  describe('GET /users/:id', () => {
    it('should return a user by id', () => {
      return request(app.getHttpServer())
        .get(`/users/${userId}`)
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveProperty('id', userId);
          expect(response.body.name).toBe(user.name);
          expect(response.body.email).toBe(user.email);
        });
    });

    it('should throw 404 error when user not found', () => {
      return request(app.getHttpServer()).get('/users/999999').expect(404);
    });
  });

  describe('PATCH /users/:id', () => {
    it('should update a user', () => {
      const updateData = {
        name: 'Updated User',
      };

      return request(app.getHttpServer())
        .patch(`/users/${userId}`)
        .send(updateData)
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveProperty('id', userId);
          expect(response.body.name).toBe(updateData.name);
          expect(response.body.email).toBe(user.email);
        });
    });

    it('should throw 404 error when user not found', () => {
      return request(app.getHttpServer())
        .patch('/users/999999')
        .send({ name: 'Updated User' })
        .expect(404);
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user', () => {
      return request(app.getHttpServer())
        .delete(`/users/${userId}`)
        .expect(200);
    });

    it('should verify user is deleted', () => {
      return request(app.getHttpServer()).get(`/users/${userId}`).expect(404);
    });

    it('should throw 404 error when user not found', () => {
      return request(app.getHttpServer()).delete('/users/999999').expect(404);
    });
  });
});
