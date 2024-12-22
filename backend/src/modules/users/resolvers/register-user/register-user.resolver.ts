import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../../services/user/user.service';
import {
  RegisterUserInput,
  RegisterUserResponse,
} from '../../dto/registerUser.dto';
import { User } from '../../entities/user.entity';

@Resolver(() => User)
export class RegisterUserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => RegisterUserResponse)
  async registerUser(@Args('user') user: RegisterUserInput): Promise<User> {
    const createdUser = this.userService.register(user);
    return createdUser;
  }
}