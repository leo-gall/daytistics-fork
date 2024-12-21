import { GqlHttpExceptionFilter } from './graphql-exception.filter';

describe('GraphqlExceptionFilter', () => {
  it('should be defined', () => {
    expect(new GqlHttpExceptionFilter()).toBeDefined();
  });
});
