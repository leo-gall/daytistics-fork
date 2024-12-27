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
                    class="font-medium text-day-primary hover:text-day-secondary"
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

    <div class="flex flex-row gap-2">
        <button
            @click="signInUsingOAuth('google')"
            class="w-full flex justify-center py-2 px-4 gap-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
        >
            <NuxtImg
                src="/svg/google.svg"
                alt="Google"
                class="w-5 h-5"
            />
            <span> Google </span>
        </button>
        <button
            @click="signInUsingOAuth('github')"
            class="w-full flex justify-center py-2 px-4 gap-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#333333] hover:bg-[#000000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
        >
            <GitHubIcon class="w-5 h-5" />
            <span> Github </span>
        </button>
    </div>
</template>

<script setup lang="ts">
import { GitHubIcon } from 'vue3-simple-icons';
import { toast } from 'vue-sonner';

const client = useSupabaseClient();

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

async function signInUsingOAuth(provider: 'google' | 'github') {
    const { error } = await client.auth.signInWithOAuth({
        provider: provider,
        options: {
            redirectTo: 'http://localhost:3000/confirm',
        },
    });

    if (error) {
        toast.error(
            'Failed to sign in using ' + provider.charAt(0).toUpperCase() + provider.slice(1)
        );
    }
}
</script>
