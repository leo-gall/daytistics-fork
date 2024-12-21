import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { CommonModule } from './common/common.module';
import { APP_FILTER } from '@nestjs/core';
import { GqlHttpExceptionFilter } from './common/filters/graphql-exception/graphql-exception.filter';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as any,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      migrations: [join(__dirname, '**', 'migrations', '*.{ts,js}')],
      synchronize: process.env.RUNTIME_ENV === 'development',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UsersModule,
    CommonModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GqlHttpExceptionFilter,
    },
  ],
})
export class AppModule {}
