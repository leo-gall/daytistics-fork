<template>
    <form
        v-if="form.resetStage.value === 0 && testStage === 1"
        class="space-y-3"
        @submit.prevent="form.submitRequest"
    >
        <input
            v-model="form.email.value"
            id="email"
            placeholder="Email address"
            type="email"
            required
            class="input"
        />

        <NuxtTurnstile
            as="div"
            class="my-3"
            v-model="form.turnstile.value"
        />

        <button
            type="submit"
            class="w-full flex justify-center button"
        >
            Send Reset Email
        </button>
    </form>
    <form
        v-else
        class="space-y-6"
        @submit.prevent="form.submitReset"
    >
        <div class="space-y-3">
            <p class="text-daytistics-gray-dark">
                Please enter your new password below and make sure to remember it.
            </p>
            <input
                v-model="form.password.value"
                type="password"
                name="password"
                id="password"
                class="input"
                placeholder="New Password"
            />

            <input
                v-model="form.repeatedPassword.value"
                type="password"
                name="repeat-password"
                id="repeat-password"
                class="input"
                placeholder="Repeat Password"
            />
        </div>
        <hr />
        <div class="space-y-3">
            <p class="text-daytistics-gray-dark text-center">
                If the email address is correct, you should have received an email with a 6-digit
                code. Please enter it below.
            </p>
            <AuthOTP v-model="form.otp.value" />
            <NuxtTurnstile
                as="div"
                class="my-3"
                v-model="form.turnstile.value"
            />
            <p class="text-xs leading-5 text-gray-500 text-center mt-2 mb-5">
                No code? Check your spam folder or
                <button
                    type="button"
                    class="font-medium text-day-primary hover:text-day-secondary"
                >
                    Resend
                </button>
            </p>
        </div>

        <button
            type="submit"
            class="w-full flex justify-center button"
        >
            Reset Password
        </button>
    </form>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner';

const emit = defineEmits(['completed']);
const form = useForm();

// Used for testing purposes
const attrs = useAttrs();
const testStage = attrs['data-test-stage'] ? parseInt(attrs['data-test-stage'] as string) : 1;

function useForm() {
    const email = ref('');
    const password = ref('');
    const repeatedPassword = ref('');
    const otp = ref('');
    const turnstile = ref('');
    const resetStage = ref(0);

    const submitRequest = async () => {
        if (!(await validateTurnstileToken(turnstile.value))) {
            toast.error('We could not validate that you are a human. Please try again.');
            return;
        }

        $fetch('/api/auth/recovery', {
            method: 'POST',
            body: {
                email: email.value,
            },
            onResponse: ({ response }) => {
                if (response.ok) {
                    toast.success(
                        'If the email address is correct, you should receive an email shortly.'
                    );
                } else {
                    toast.error('Failed to send reset email. Please try again.');
                }
            },
        });
    };

    const submitReset = async () => {
        if (password.value !== repeatedPassword.value) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            $fetch('/api/auth/recovery/verify', {
                method: 'POST',
                body: {
                    email: email.value,
                    password: password.value,
                    code: otp.value,
                },

                onResponse: ({ response }) => {
                    if (response.ok) {
                        toast.success('Password reset successfully');
                        emit('completed');
                    } else {
                        toast.error(response._data.message || 'An error occurred');
                    }
                },
            });
        } catch (error: any) {
            console.error(error);
        }
    };

    return {
        email,
        password,
        repeatedPassword,
        otp,
        turnstile,
        submitRequest,
        submitReset,
        resetStage,
    };
}
</script>
