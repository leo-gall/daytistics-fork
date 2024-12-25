import { z } from 'zod';
import { validateZodSchema } from '../../../utils/validation';
import { serverSupabaseServiceRole } from '#supabase/server';

const signUpSchema = z.object({
    username: z.string().regex(/^[a-zA-Z0-9_]{5,}$/),
    email: z.string().email(),
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&§*-]).{8,}$/),
});

export default defineEventHandler(async (event) => {
    const adminClient = serverSupabaseServiceRole(event);
    const validatedBody = validateZodSchema(signUpSchema, await readBody(event));

    const { error, data } = await adminClient.auth.signUp({
        email: validatedBody.email,
        password: validatedBody.password,
        options: {
            data: {
                display_name: validatedBody.username,
            },
        },
    });

    if (error) {
        throw createError({
            status: 500,
            statusMessage: error.message,
        });
    }

    setResponseStatus(event, 201);
});
