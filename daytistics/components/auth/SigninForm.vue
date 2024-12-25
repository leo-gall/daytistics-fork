<template>
    <form
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
        <input
            v-model="form.password.value"
            id="password"
            placeholder="Password"
            type="text"
            required
            class="input"
        />

        <div>
            <p class="text-xs leading-5 text-gray-500 text-right mt-2 mb-5">
                Forgot your password?
                <button
                    @click="emit('clicked:reset-password')"
                    type="button"
                    class="font-medium text-primary hover:text-secondary"
                >
                    Reset
                </button>
            </p>
            <button
                type="submit"
                class="w-full flex justify-center button"
            >
                Sign In
            </button>
        </div>
    </form>
    <div class="flex items-center justify-center my-3">Or Sign in with</div>

    <AuthOAuthProviders
        @click:google="googleAuth.signIn"
        @click:github="githubAuth.signIn"
    />
</template>

<script setup lang="ts">
import { useToast } from 'vue-toastification';

const githubAuth = useGithubAuth();
const googleAuth = useGoogleAuth();
const client = useSupabaseClient();
const toast = useToast();

const emit = defineEmits(['clicked:reset-password', 'completed']);

const form = useForm();

function useForm() {
    const email = ref('');
    const password = ref('');

    const submit = async () => {
        const { data, error } = await client.auth.signInWithPassword({
            email: email.value,
            password: password.value,
        });

        if (error) {
            toast.error(error.message);
        } else {
            toast.success('Logged in successfully');
            emit('completed');
        }
    };

    return {
        email,
        password,
        submit,
    };
}

function useGithubAuth() {
    const signIn = async () => {
        const { data, error } = await client.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: 'http://localhost:3000/confirm',
            },
        });

        console.log(data, error);
    };

    return {
        signIn,
    };
}

function useGoogleAuth() {
    const signIn = async () => {
        const { data, error } = await client.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'http://localhost:3000/confirm',
            },
        });

        console.log(data, error);
    };

    return {
        signIn,
    };
}
</script>
