import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import {
  EmailAlreadyInUseException,
  InvalidEmailException,
} from '../../users.exceptions';
import { isValidEmail } from 'src/common/utils/validation/users/users.validation';

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

    const toCreate = {
      ...userData,
      hashedPassword: userData.password,
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
