import { HttpException, HttpStatus } from '@nestjs/common';
import { GraphQLError } from 'graphql';

export class InvalidEmailException extends GraphQLError {
  constructor() {
    super('Invalid email', {
      extensions: { code: 'INVALID_EMAIL' },
    });
  }
}

export class InvalidPasswordException extends HttpException {
  constructor() {
    super('Invalid (bad) password', HttpStatus.BAD_REQUEST);
  }
}

export class InvalidUsernameException extends HttpException {
  constructor() {
    super('Invalid username', HttpStatus.BAD_REQUEST);
  }
}

export class EmailAlreadyInUseException extends HttpException {
  constructor() {
    super('Email already in use', HttpStatus.BAD_REQUEST);
  }
}
