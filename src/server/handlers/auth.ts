import { SupabaseClient } from '@supabase/supabase-js';
import { SignUpSchema } from '../schemas/auth';

export async function handleSignUp(client: SupabaseClient, body: unknown) {
    const validatedBody = validateZodSchema(SignUpSchema, body);

    const { error } = await client.auth.signUp({
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
}

// export async function handleVerifySignUp(client: SupabaseClient, body: unknown) {
//     const validatedBody = validateZodSchema(VerifySignUpSchema, body);

//     const { data, error: verifyError } = await client.auth.verifyOtp({
//         token: validatedBody.code,
//         email: validatedBody.email,
//         type: 'signup',
//     });

//     if (verifyError || !data.user) {
//         throw createError({
//             status: 500,
//             statusMessage: verifyError?.message,
//         });
//     }

//     const { error: updateError } = await client.auth.admin.updateUserById(data.user.id, {
//         user_metadata: {
//             ...data.user.user_metadata,
//             email_verified: true,
//         },
//     });

//     if (updateError) {
//         throw createError({
//             status: 500,
//             statusMessage: updateError.message,
//         });
//     }
// }
