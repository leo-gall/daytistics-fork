import { cache } from '.';
import { createHash } from 'crypto';

const MAX_VERIFICATION_ATTEMPTS = 3;
const CACHE_TTL_SECONDS = 180; // 3 minutes

export enum VerificationType {
    RECOVERY = 'recovery',
}

// Helper: Hash die E-Mail für sichere Speicherung
function hashEmail(email: string): string {
    return createHash('sha256').update(email).digest('hex');
}

export function addVerificationAttempt(email: string, type: VerificationType) {
    const hashedEmail = hashEmail(email);
    const key = `${type}:${hashedEmail}`;
    const attempts = cache.get(key) as number | undefined;
    cache.set(key, attempts ? attempts + 1 : 1, CACHE_TTL_SECONDS);
}

export function canAttemptVerification(email: string, type: VerificationType) {
    const hashedEmail = hashEmail(email);
    const key = `${type}:${hashedEmail}`;
    const attempts = cache.get(key) as number | undefined;
    return attempts ? attempts < MAX_VERIFICATION_ATTEMPTS : true;
}

export function resetVerificationAttempts(email: string, type: VerificationType) {
    const hashedEmail = hashEmail(email);
    const key = `${type}:${hashedEmail}`;
    cache.del(key);
}

export function getVerificationAttempts(email: string, type: VerificationType) {
    const hashedEmail = hashEmail(email);
    const key = `${type}:${hashedEmail}`;
    return cache.get(key) as number | undefined;
}

export function remainingMinutesTillNextAttempt(email: string, type: VerificationType) {
    const hashedEmail = hashEmail(email);
    const key = `${type}:${hashedEmail}`;
    const ttl = cache.getTtl(key);

    if (!ttl) {
        return 0;
    }

    const currentTime = new Date().getTime();

    return Math.ceil((ttl - currentTime) / 1000 / 60);
}
