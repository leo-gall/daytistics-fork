import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.schema';
import { Any } from 'typeorm';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User]) // GraphQL query for fetching all users
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Mutation(() => User) // GraphQL mutation for creating a user
  async createUser(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('age', { nullable: true }) age?: number,
  ): Promise<undefined> {
    return undefined;
  }
}
