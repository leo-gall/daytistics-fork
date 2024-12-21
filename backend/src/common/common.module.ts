import { Module } from '@nestjs/common';
import { HealthResolver } from './resolvers/health/health.resolver';
import { APP_FILTER } from '@nestjs/core';
import { GqlHttpExceptionFilter } from './filters/graphql-exception/graphql-exception.filter';

@Module({
  providers: [HealthResolver],
})
export class CommonModule {}
