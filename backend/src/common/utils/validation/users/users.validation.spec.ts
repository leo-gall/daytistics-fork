import {
  isValidPassword,
  isValidEmail,
  isValidUsername,
} from './users.validation';

describe('User Validation Functions', () => {
  describe('isValidPassword', () => {
    it('should return true for valid passwords', () => {
      expect(isValidPassword('Password1!')).toBe(true);
      expect(isValidPassword('Aa1#aaaa')).toBe(true);
      expect(isValidPassword('Valid$Pass123')).toBe(true);
    });

    it('should return false for invalid passwords', () => {
      expect(isValidPassword('password')).toBe(false); // no uppercase, digit, or special char
      expect(isValidPassword('PASSWORD1')).toBe(false); // no lowercase or special char
      expect(isValidPassword('Passw1')).toBe(false); // less than 8 characters
      expect(isValidPassword('Password!')).toBe(false); // no digit
      expect(isValidPassword('Password1')).toBe(false); // no special char
    });
  });

  describe('isValidEmail', () => {
    it('should return true for valid emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name+tag+sorting@example.com')).toBe(true);
      expect(isValidEmail('user_name@example.co.uk')).toBe(true);
    });

    it('should return false for invalid emails', () => {
      expect(isValidEmail('plainaddress')).toBe(false);
      expect(isValidEmail('@missingusername.com')).toBe(false);
      expect(isValidEmail('username@.com')).toBe(false);
      expect(isValidEmail('username@com')).toBe(false);
      expect(isValidEmail('username@.com.')).toBe(false);
    });
  });

  describe('isValidUsername', () => {
    it('should return true for valid usernames', () => {
      expect(isValidUsername('user_1')).toBe(true);
      expect(isValidUsername('username')).toBe(true);
      expect(isValidUsername('user123')).toBe(true);
      expect(isValidUsername('user_name123')).toBe(true);
    });

    it('should return false for invalid usernames', () => {
      expect(isValidUsername('usr')).toBe(false); // less than 5 characters
      expect(isValidUsername('user!')).toBe(false); // invalid character
      expect(isValidUsername('user name')).toBe(false); // space not allowed
      expect(isValidUsername('user-name')).toBe(false); // hyphen not allowed
    });
  });
});
