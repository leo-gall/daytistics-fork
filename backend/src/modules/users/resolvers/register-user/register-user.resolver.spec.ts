import { Test, TestingModule } from '@nestjs/testing';
import { RegisterUserResolver } from './register-user.resolver';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { createFakeUser } from 'src/test-utils/fakes/users.fake';

describe('RegisterUserResolver', () => {
  let resolver: RegisterUserResolver;
  let userRepository: any;
  let mockUserRepository: any;

  const userData = createFakeUser();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisterUserResolver],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUserRepository)
      .compile();

    resolver = module.get<RegisterUserResolver>(RegisterUserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should register a user', async () => {});

  it('should throw an error if the user does already exist', async () => {
    mockUserRepository.findOne.mockResolvedValue(userData);
    await expect(
      resolver.registerUser({
        username: userData.username,
        email: userData.email,
        password: userData.hashedPassword,
      }),
    ).rejects.toThrow();
  });
});
