import { serverSupabaseServiceRole } from '#supabase/server';
import { z } from 'zod';

const verifyBody = z.object({
    code: z.string(),
    email: z.string().email(),
});

export default defineEventHandler(async (event) => {
    const client = serverSupabaseServiceRole(event);
    const validatedBody = validateZodSchema(verifyBody, await readBody(event));

    const { code, email } = validatedBody;

    const { data, error: verifyError } = await client.auth.verifyOtp({
        token: code,
        email,
        type: 'signup',
    });
    if (verifyError || !data.user) {
        throw createError({
            status: 500,
            message: verifyError?.message,
        });
    }

    const { error: updateError } = await client.auth.admin.updateUserById(data.user.id, {
        user_metadata: {
            ...data.user.user_metadata,
            email_verified: true,
        },
    });

    if (updateError) {
        throw createError({
            status: 500,
            message: updateError.message,
        });
    }
    setResponseStatus(event, 204);
});
