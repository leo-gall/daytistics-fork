import { Field, Int, ObjectType, InputType, OmitType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class RegisterUserInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@ObjectType()
export class RegisterUserResponse extends OmitType(User, ['hashedPassword']) {}
