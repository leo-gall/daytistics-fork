<template>
    <form
        class="space-y-3"
        @submit.prevent="form.submit"
    >
        <input
            v-model="form.username.value"
            id="name"
            placeholder="User Name"
            type="text"
            required
            :disabled="form.awaitingVerification.value"
            class="input"
        />
        <input
            v-model="form.email.value"
            id="email"
            placeholder="Email Address"
            type="email"
            required
            :disabled="form.awaitingVerification.value"
            class="input"
        />
        <input
            v-model="form.password.value"
            id="password"
            placeholder="Password"
            type="password"
            required
            :disabled="form.awaitingVerification.value"
            class="input"
        />
        <div
            v-if="form.awaitingVerification.value"
            class="space-y-3 py-6"
        >
            <p class="text-daytistics-gray-dark text-center">
                Please enter the code sent to your email to verify your account.
            </p>
            <div class="text-center">
                <AuthOTP v-model="form.otp.value" />
            </div>
        </div>
        <div>
            <button
                type="submit"
                class="w-full flex justify-center button"
            >
                {{ form.awaitingVerification.value ? 'Verify Email' : 'Sign Up' }}
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner';
const form = useForm();

const emit = defineEmits(['completed']);

function useForm() {
    const username = ref('');
    const password = ref('');
    const email = ref('');
    const otp = ref('');
    const awaitingVerification = ref(false);

    const submit = async () => {
        if (!awaitingVerification.value) {
            if (!validate()) return;
            try {
                await $fetch('/api/auth/signup', {
                    method: 'POST',
                    body: {
                        username: username.value,
                        email: email.value,
                        password: password.value,
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            toast.success(
                                'Account created successfully. Please verify your email.'
                            );
                            awaitingVerification.value = true;
                        } else {
                            toast.error(response._data.message);
                        }
                    },
                });
            } catch (error) {
                console.error(error);
            }
        } else {
            if (otp.value.length !== 6) {
                toast.error('Please enter a valid OTP.');
                return;
            }

            try {
                await $fetch('/api/auth/signup/verify', {
                    method: 'POST',
                    body: {
                        email: email.value,
                        code: otp.value,
                    },
                });
                toast.success('Account verified successfully. Please log in.');
                emit('completed');
            } catch (error) {
                toast.error('Invalid OTP. Please try again.');
            }
        }
    };

    const validate = () => {
        if (!isValidUsername(username.value)) {
            toast.error('Please enter a valid username.');
            return false;
        }

        if (!isValidPassword(password.value)) {
            toast.error('Please enter a stronger password.');
            return false;
        }

        return true;
    };

    return {
        username,
        password,
        email,
        submit,
        awaitingVerification,
        otp,
    };
}
</script>
