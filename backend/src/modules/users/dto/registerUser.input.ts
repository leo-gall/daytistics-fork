import { Field, Int, ObjectType, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterUserInput {
    @Field(() => String)
    username: string;

    @Field(() => String)
    email: string;

    @Field(() => String)
    password: string;
}