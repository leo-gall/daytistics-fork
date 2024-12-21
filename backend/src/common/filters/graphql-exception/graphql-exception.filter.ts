import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch()
export class GqlHttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const errorMessage = exception.message || 'An error occurred';
    const errorCode = (exception.constructor.name as string)
      .replace(/([A-Z])/g, '_$1')
      .toUpperCase()
      .substring(1)
      .replace(/_EXCEPTION$/, '')
      .replace(/_ERROR$/, '');

    const graphQLError = new GraphQLError(errorMessage, {
      extensions: { code: errorCode },
    });

    throw graphQLError;
  }
}
