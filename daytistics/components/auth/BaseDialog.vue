<template>
    <Dialog
        :title="dialogTitle"
        :open="open"
        @close="closeDialog"
        size="md"
    >
        <AuthSigninForm
            v-if="authMode == AuthMode.SIGNIN"
            @clicked:reset-password="updateAuthMode(AuthMode.RESET_PASSWORD)"
            @completed="closeDialog"
        />
        <AuthResetPasswordForm v-else-if="authMode == AuthMode.RESET_PASSWORD" />
        <AuthSignupForm
            @completed="updateAuthMode(AuthMode.SIGNIN)"
            v-else
        />
        <div class="mt-5">
            <p
                v-if="authMode === AuthMode.SIGNUP"
                class="text-xs leading-5 text-gray-500"
            >
                Already have an account?
                <button
                    @click="updateAuthMode(AuthMode.SIGNIN)"
                    type="button"
                    class="font-medium text-primary hover:text-secondary"
                >
                    Log In
                </button>
            </p>
            <p
                v-else-if="authMode === AuthMode.RESET_PASSWORD"
                class="text-xs leading-5 text-gray-500"
            >
                Remember your password again?
                <button
                    @click="updateAuthMode(AuthMode.SIGNIN)"
                    type="button"
                    class="font-medium text-primary hover:text-secondary"
                >
                    Sign In
                </button>
            </p>
            <p
                v-else
                class="text-xs leading-5 text-gray-500"
            >
                Don't have an account?
                <button
                    @click="updateAuthMode(AuthMode.SIGNUP)"
                    type="button"
                    class="font-medium text-primary hover:text-secondary"
                >
                    Sign up
                </button>
            </p>
        </div>
    </Dialog>
</template>

<script setup lang="ts">
defineProps<{
    open: boolean;
}>();

enum AuthMode {
    SIGNIN,
    SIGNUP,
    RESET_PASSWORD,
}

const emit = defineEmits(['close']);
const authMode = ref<AuthMode>(AuthMode.SIGNIN);
const dialogTitle = computed(() => {
    switch (authMode.value) {
        case AuthMode.SIGNIN:
            return 'Sign in to your account';
        case AuthMode.SIGNUP:
            return 'Sign up to create account';
        case AuthMode.RESET_PASSWORD:
            return 'Reset your password';
    }
});

function updateAuthMode(updatedAuthMode: AuthMode) {
    console.log('updateAuthMode', authMode.value);
    authMode.value = updatedAuthMode;
}

function closeDialog() {
    emit('close');

    authMode.value = AuthMode.SIGNIN;
}
</script>
