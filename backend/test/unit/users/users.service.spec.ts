import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '@/src/modules/users/users.service';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '@/src/modules/users/dto/create.dto';
import { UpdateUserDto } from '@/src/modules/users/dto/update.dto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', () => {
      const createUserDto: CreateUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      const user = service.create(createUserDto);

      expect(user).toHaveProperty('id');
      expect(user.name).toBe(createUserDto.name);
      expect(user.email).toBe(createUserDto.email);
      expect(user.password).toBe(createUserDto.password);
      expect(user).toHaveProperty('createdAt');
      expect(user).toHaveProperty('updatedAt');
    });
  });

  describe('findAll', () => {
    it('should return an array of users', () => {
      expect(service.findAll()).toEqual([]);

      const createUserDto: CreateUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };
      const user = service.create(createUserDto);

      expect(service.findAll()).toContainEqual(user);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', () => {
      const createUserDto: CreateUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };
      const createdUser = service.create(createUserDto);

      const foundUser = service.findOne(createdUser.id);

      expect(foundUser).toEqual(createdUser);
    });

    it('should throw NotFoundException if user not found', () => {
      expect(() => service.findOne(9999999)).toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a user', () => {
      const createUserDto: CreateUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };
      const createdUser = service.create(createUserDto);

      const updateUserDto: UpdateUserDto = {
        name: 'Updated User',
      };

      const updatedUser = service.update(createdUser.id, updateUserDto);

      expect(updatedUser.id).toBe(99);
      expect(updatedUser.name).toBe(updateUserDto.name);
      expect(updatedUser.email).toBe(createdUser.email);
      expect(updatedUser.password).toBe(createdUser.password);
    });

    it('should throw NotFoundException if user not found', () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Updated User',
      };

      expect(() => service.update(9999999, updateUserDto)).toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a user', () => {
      const createUserDto: CreateUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };
      const createdUser = service.create(createUserDto);

      service.remove(createdUser.id);

      expect(() => service.findOne(createdUser.id)).toThrow(NotFoundException);
    });

    it('should throw NotFoundException if user not found', () => {
      expect(() => service.remove(9999999)).toThrow(NotFoundException);
    });
  });
});
