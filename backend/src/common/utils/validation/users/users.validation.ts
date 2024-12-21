export function isValidPassword(password: string): boolean {
  return (
    password.match(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    ) !== null
  );
}

export function isValidEmail(email: string): boolean {
  return (
    email.match(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/,
    ) !== null
  );
}

export function isValidUsername(username: string): boolean {
  return username.match(/^[a-zA-Z0-9_]{5,}$/) !== null;
}
