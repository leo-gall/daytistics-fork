import { z } from 'zod';

export const PASSWORD_PATTERN = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&§*-]).{8,}$/;
export const EMAIL_PATTERN = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
export const USERNAME_PATTERN = /^[a-zA-Z0-9 _-]{5,}$/;

export function isValidPassword(password: string) {
    return password.match(PASSWORD_PATTERN) !== null;
}

export function isValidUsername(username: string) {
    return username.match(USERNAME_PATTERN) !== null;
}

export function validateZodSchema<T>(schema: z.ZodType<T, any>, data: any): T {
    try {
        return schema.parse(data);
    } catch (error: any) {
        console.log(error);
        throw createError({
            data: error.errors,
            status: 422,
            statusMessage: 'Schema validation error',
        });
    }
}
