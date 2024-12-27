<template>
    <transition name="banner">
        <div
            v-if="isVisible"
            class="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 shadow-md z-50"
        >
            <div class="container mx-auto flex items-center justify-between">
                <div class="flex items-center space-x-2">
                    <InfoIcon class="h-5 w-5" />
                    <span class="text-sm sm:text-base font-medium">
                        Our services will no longer be free after the open beta period ends.
                    </span>
                </div>
                <button
                    @click="closeBanner"
                    class="text-white hover:text-gray-200 focus:outline-none transition duration-150 ease-in-out"
                >
                    <XIcon class="h-5 w-5" />
                </button>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { ref } from 'vue';
import { InfoIcon, XIcon } from 'lucide-vue-next';

const isVisible = ref(true);
const localSettings = useLocalSettings();

const closeBanner = () => {
    isVisible.value = false;
    localSettings.set('betaBanner', false);
};

onMounted(() => {
    if (!localSettings.get('betaBanner')) {
        isVisible.value = false;
    }
});
</script>

<style scoped>
.banner-enter-active,
.banner-leave-active {
    transition: all 0.5s ease;
}
.banner-enter-from,
.banner-leave-to {
    transform: translateY(-100%);
    opacity: 0;
}
</style>
