import { faker } from '@faker-js/faker';
import { User } from 'src/modules/users/entities/user.entity';

export function createFakeUser(overrides: Partial<User> = {}): User {
  const user = new User();
  user.id = overrides.id ?? faker.string.uuid();
  user.username = overrides.username ?? faker.internet.userName();
  user.email = overrides.email ?? faker.internet.email();
  user.hashedPassword = overrides.hashedPassword ?? 'fakeHashPlaceholder';
  user.isVerified = overrides.isVerified ?? false;
  user.isLocked = overrides.isLocked ?? false;
  user.isAdmin = overrides.isAdmin ?? false;
  user.lastLogin = overrides.lastLogin ?? null;
  user.createdAt = overrides.createdAt ?? new Date();

  return user;
}
