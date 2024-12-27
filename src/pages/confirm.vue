<template>
    <div
        class="bg-gradient-to-br from-gradient-1 to-gradient-2 min-h-screen flex items-center justify-center overflow-hidden"
    >
        <div class="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
            <div class="p-6 sm:p-8">
                <div class="flex justify-center mb-8">
                    <NuxtImg
                        src="/img/logo.png"
                        alt="Logo"
                        class="h-12 w-auto"
                    />
                </div>
                <h2 class="text-2xl font-bold text-center text-daytistics-gray-dark-2 mb-2">
                    Logging you in...
                </h2>
                <p class="text-center text-daytistics-gray-dark-2 mb-6">
                    We are currently processing your login. This may take a few moments. Thank you
                    for your patience.
                </p>
                <Spinner class="w-8 h-8 mx-auto" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();

watch(
    user,
    () => {
        setTimeout(() => {
            console.log('timeout');
        }, 10000);

        if (user.value) {
            return navigateTo('/dashboard');
        }
    },
    { immediate: true }
);

useHead({
    title: 'Logging in...',
});
</script>
