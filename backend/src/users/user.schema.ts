import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType() // Marks this class as a GraphQL object type
@Entity() // Marks this class as a TypeORM entity
export class User {
  @Field(() => Int) // Exposes this field in GraphQL schema
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  age?: number;
}
