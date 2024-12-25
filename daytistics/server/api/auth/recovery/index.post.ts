import { serverSupabaseServiceRole } from '#supabase/server';
import { z } from 'zod';

const recoverySchema = z.object({
    email: z.string().email(),
});

export default defineEventHandler(async (event) => {
    const client = serverSupabaseServiceRole(event);
    const validatedBody = validateZodSchema(recoverySchema, await readBody(event));

    const { email } = validatedBody;

    const { error } = await client.auth.resetPasswordForEmail(email);

    if (error) {
        throw createError({
            status: 500,
            statusMessage: error.message,
        });
    }

    setResponseStatus(event, 204);
});
