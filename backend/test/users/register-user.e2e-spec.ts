import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from '../../src/modules/users/entities/user.entity';
import { createFakeUser } from '../../test-utils/fakes/users.fake';
import { AppModule } from '../../src/app.module';
import { setupDatabase } from '../setup-db';

describe('createUser (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let userRepository: Repository<User>;

  const userData = createFakeUser();

  const gqlMutation = `
    mutation($user: RegisterUserInput!) {
      registerUser(user: $user) {
        username
        email
        isVerified
        isAdmin
      }
    }
  `;

  beforeAll(async () => {
    dataSource = await setupDatabase();
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DataSource)
      .useValue(dataSource)
      .compile();
    app = module.createNestApplication();
    await app.init();

    userRepository = module.get(getRepositoryToken(User));
  });

  it("should register a new user and return the user's data", () => {});

  it('should return error when registering an already registered user (email)', () => {
    userRepository.save(userData);

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: gqlMutation,
        variables: {
          user: {
            username: userData.username,
            email: userData.email,
            password: userData.hashedPassword,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.errors[0].extensions.code).toBe('EMAIL_ALREADY_IN_USE');
      });
  });

  it.each<string>([
    'invalid-email',
    'invalid-email@',
    'invalid-email@com',
    'invalid-email.com',
  ])(
    'should return error when registering using an invalid email',
    (email: string) => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: gqlMutation,
          variables: {
            user: {
              username: userData.username,
              email,
              password: userData.hashedPassword,
            },
          },
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.errors[0].extensions.code).toBe('INVALID_EMAIL');
        });
    },
  );

  // Does not work - I don't know why
  it.each<string>([
    'short',
    '12345678',
    'password',
    'PASSWORD',
    'pass word',
    '1234abcd',
    'abcd1234',
    'password123',
    '123password',
    'pass1234',
  ])(
    'should return error when registering using an invalid password',
    (password: string) => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: gqlMutation,
          variables: {
            user: {
              username: userData.username,
              email: userData.email,
              password,
            },
          },
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.errors[0].extensions.code).toBe('INVALID_PASSWORD');
        });
    },
  );

  it.each<string>(['usr', 'user!', 'user name', 'user-name'])(
    'should return error when registering using an invalid username',
    (username: string) => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: gqlMutation,
          variables: {
            user: {
              username: username,
              email: userData.email,
              password: userData.hashedPassword,
            },
          },
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.errors[0].extensions.code).toBe('INVALID_USERNAME');
        });
    },
  );

  it('should return error when verification email fails to send', () => {});

  afterAll(async () => {
    await app.close();
  });
});
