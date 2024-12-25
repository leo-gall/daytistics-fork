import { cache } from '.';

const MAX_VERIFICATION_ATTEMPTS = 3;

export enum VerificationType {
    RECOVERY = 'recovery',
}

export function addVerificationAttempt(email: string, type: VerificationType) {
    const attempts = cache.get(`${type}:${email}`) as number | undefined;
    cache.set(`${type}:${email}`, attempts ? attempts + 1 : 1, 60);
}

export function canAttemptVerification(email: string, type: VerificationType) {
    const attempts = cache.get(`${type}:${email}`) as number | undefined;
    return attempts ? attempts < MAX_VERIFICATION_ATTEMPTS : true;
}

export function resetVerificationAttempts(email: string, type: VerificationType) {
    cache.del(`${type}:${email}`);
}

export function getVerificationAttempts(email: string, type: VerificationType) {
    return cache.get(`${type}:${email}`) as number | undefined;
}
