import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import { User } from '../../entities/user.entity';
import {
  EmailAlreadyInUseException,
  InvalidEmailException,
  InvalidPasswordException,
  InvalidUsernameException,
} from '../../users.exceptions';
import {
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from '../../../../common/utils/validation/users/users.validation';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async register(userData: {
    username: string;
    email: string;
    password: string;
  }): Promise<User> {
    if (!isValidEmail(userData.email)) {
      throw new InvalidEmailException();
    }

    if (!isValidUsername(userData.username)) {
      throw new InvalidUsernameException();
    }

    if (!isValidPassword(userData.password)) {
      throw new InvalidPasswordException();
    }

    const hashedPassword = await hash(userData.password, 10);
    const toCreate = {
      ...userData,
      hashedPassword,
    };

    if (
      await this.userRepository.findOne({ where: { email: toCreate.email } })
    ) {
      throw new EmailAlreadyInUseException();
    }

    const user = this.userRepository.create(toCreate);
    return this.userRepository.save(user);
  }
}
