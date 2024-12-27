export const validateTurnstileToken = async (token: string) => {
    const response = await $fetch('/_turnstile/validate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: { token: token },
    });

    if (response.success) {
        return true;
    }

    return false;
};
