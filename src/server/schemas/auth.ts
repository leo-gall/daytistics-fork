import { z } from 'zod';

export const SignUpSchema = z.object({
    username: z.string().regex(USERNAME_PATTERN),
    email: z.string().email(),
    password: z.string().regex(PASSWORD_PATTERN),
});
