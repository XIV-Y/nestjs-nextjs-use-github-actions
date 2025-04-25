import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '@/src/modules/users/users.controller';
import { UsersService } from '@/src/modules/users/users.service';
import { CreateUserDto } from '@/src/modules/users/dto/create.dto';
import { UpdateUserDto } from '@/src/modules/users/dto/update.dto';
import { User } from '@/src/modules/users/entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', () => {
      const createUserDto: CreateUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      const mockUser: User = {
        id: 1,
        ...createUserDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'create').mockReturnValue(mockUser);

      expect(controller.create(createUserDto)).toBe(mockUser);
      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', () => {
      const mockUsers: User[] = [
        {
          id: 1,
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(service, 'findAll').mockReturnValue(mockUsers);

      expect(controller.findAll()).toBe(mockUsers);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', () => {
      const mockUser: User = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'findOne').mockReturnValue(mockUser);

      expect(controller.findOne(1)).toBe(mockUser);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a user', () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Updated User',
      };

      const mockUser: User = {
        id: 1,
        name: 'Updated User',
        email: 'test@example.com',
        password: 'password123',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'update').mockReturnValue(mockUser);

      expect(controller.update(1, updateUserDto)).toBe(mockUser);
      expect(service.update).toHaveBeenCalledWith(1, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should remove a user', () => {
      jest.spyOn(service, 'remove').mockReturnValue(undefined);

      expect(controller.remove(1)).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
