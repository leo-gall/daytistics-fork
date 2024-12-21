import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './services/user/user.service';
import { RegisterUserResolver } from './resolvers/register-user/register-user.resolver';
import { APP_FILTER } from '@nestjs/core';
import { GqlHttpExceptionFilter } from 'src/common/filters/graphql-exception/graphql-exception.filter';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [RegisterUserResolver, UserService],
  controllers: [],
})
export class UsersModule {}
