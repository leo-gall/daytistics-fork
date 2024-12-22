import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Field(() => String)
  @Column()
  username: string;

  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Field(() => String)
  @Column()
  hashedPassword: string;

  @Field(() => Boolean)
  @Column({ default: false })
  isVerified: boolean;

  @Field(() => Boolean)
  @Column({ default: false })
  isLocked: boolean;

  @Field(() => Boolean)
  @Column({ default: false })
  isAdmin: boolean;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date | null;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
