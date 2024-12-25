<template>
    <form
        v-if="form.resetRequested.value"
        class="space-y-6"
        @submit.prevent="form.submit"
    >
        <div class="space-y-3">
            <p class="text-dark">
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
                v-model="form.repeatPassword.value"
                type="password"
                name="repeat-password"
                id="repeat-password"
                class="input"
                placeholder="Repeat Password"
            />
        </div>
        <hr />
        <div class="space-y-3">
            <p class="text-dark text-center">
                If the email address is correct, you should have received an email with a 6-digit
                code. Please enter it below.
            </p>
            <AuthOTP v-model="form.otpToken.value" />
        </div>

        <button
            type="submit"
            class="w-full flex justify-center button"
        >
            Reset Password
        </button>
    </form>
    <form
        v-else
        class="space-y-3"
        @submit.prevent="form.submit"
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
        />

        <button
            type="submit"
            class="w-full flex justify-center button"
        >
            Send Reset Email
        </button>
    </form>
</template>

<script setup lang="ts">
import { useToast } from 'vue-toastification';

const toast = useToast();
const form = useForm();

const response = ref();

const emit = defineEmits(['completed']);

function useForm() {
    const email = ref('');
    const password = ref('');
    const repeatPassword = ref('');
    const resetRequested = ref(false);
    const otpToken = ref('');
    const turnstileToken = ref('');

    const submit = async () => {
        if (!resetRequested.value) {
            $fetch('/api/auth/recovery', {
                method: 'POST',
                body: {
                    email: email.value,
                },
            });

            toast.success('Password reset email sent');
            resetRequested.value = true;
        } else {
            if (password.value !== repeatPassword.value) {
                toast.error('Passwords do not match');
                return;
            }

            try {
                $fetch('/api/auth/recovery/verify', {
                    method: 'POST',
                    body: {
                        email: email.value,
                        password: password.value,
                        code: otpToken.value,
                    },

                    headers: {
                        'X-Turnstile-Token': turnstileToken.value,
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
        }
    };

    return {
        email,
        submit,
        resetRequested,
        password,
        repeatPassword,
        otpToken,
    };
}
</script>
