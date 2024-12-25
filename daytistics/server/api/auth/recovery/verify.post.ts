import { serverSupabaseServiceRole } from '#supabase/server';
import { z } from 'zod';
import {
    addVerificationAttempt,
    canAttemptVerification,
    getVerificationAttempts,
    remainingMinutesTillNextAttempt,
    resetVerificationAttempts,
    VerificationType,
} from '../../../cache/verification';

const verifyRecoveryBody = z.object({
    code: z.string(),
    email: z.string().email(),
    password: z.string(),
});

export default defineEventHandler(async (event) => {
    const client = serverSupabaseServiceRole(event);
    const validatedBody = validateZodSchema(verifyRecoveryBody, await readBody(event));

    const { code, email, password } = validatedBody;

    if (!canAttemptVerification(email, VerificationType.RECOVERY)) {
        throw createError({
            status: 429,
            message: `Too many attempts. Please try again in ${remainingMinutesTillNextAttempt(email, VerificationType.RECOVERY)} minutes.`,
        });
    }

    const { error: verifyError } = await client.auth.verifyOtp({
        token: code,
        email,
        type: 'recovery',
    });
    if (verifyError) {
        addVerificationAttempt(email, VerificationType.RECOVERY);
        throw createError({
            status: 500,
            message: verifyError.message,
            data: {
                attempts: getVerificationAttempts(email, VerificationType.RECOVERY),
            },
        });
    }

    const { error: updateError } = await client.auth.updateUser({
        email,
        password,
    });

    if (updateError) {
        throw createError({
            status: 500,
            message: updateError.message,
        });
    }

    resetVerificationAttempts(email, VerificationType.RECOVERY);

    return {
        status: 'success',
    };
});
