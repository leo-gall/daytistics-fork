<template>
    <div
        class="bg-gradient-to-br from-gradient-1 to-gradient-2 min-h-screen flex items-center justify-center overflow-hidden"
    >
        <div class="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
            <div class="p-6 sm:p-8">
                <div class="flex justify-center mb-8">
                    <NuxtImg
                        src="/images/logo.png"
                        alt="Logo"
                        class="h-12 w-auto"
                    />
                </div>
                <h2 class="text-2xl font-bold text-center text-dark-2 mb-2">Password Reset</h2>
                <p class="text-center text-dark-2 mb-6">
                    Please enter your new password below and make sure to remember it.
                </p>
                <form
                    @submit.prevent="form.submit"
                    class="space-y-4"
                >
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
                    <button
                        type="submit"
                        class="button"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const form = useForm();

function useForm() {
    const password = ref('');
    const repeatPassword = ref('');

    const submit = () => {
        if (password.value !== repeatPassword.value) {
            return alert('Passwords do not match');
        }

        // Call the API to reset the password
    };

    return {
        password,
        repeatPassword,
        submit,
    };
}

definePageMeta({
    layout: 'none',
});
</script>
