<template>
    <div class="min-h-screen bg-gray-100 flex">
        <!-- Sidebar Component -->
        <aside class="fixed md:relative z-30">
            <!-- Sidebar Content -->
            <div
                class="fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out"
                :class="{
                    'w-64': isSidebarOpen,
                    'w-16': !isSidebarOpen,
                }"
            >
                <!-- Header with Menu and Play buttons -->
                <div class="h-16 border-b flex items-center justify-between px-4">
                    <button
                        @click="toggleSidebar"
                        class="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 ease-in-out"
                    >
                        <Menu
                            v-if="!isSidebarOpen"
                            class="h-5 w-5 transition-opacity duration-300 ease-in-out"
                        />
                        <X
                            v-else
                            class="h-5 w-5 transition-opacity duration-300 ease-in-out"
                        />
                    </button>

                    <button
                        v-if="isSidebarOpen"
                        class="rounded-full transition-all duration-300 ease-in-out text-daytistics-secondary hover:scale-110"
                    >
                        <CirclePlay class="h-6 w-6 transition-opacity duration-300 ease-in-out" />
                    </button>
                </div>

                <!-- Navigation Items -->
                <nav class="p-2 space-y-2">
                    <a
                        v-for="item in navigationItems"
                        :key="item.name"
                        :href="item.href"
                        class="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        :class="{ 'justify-center': !isSidebarOpen }"
                    >
                        <component
                            :is="item.icon"
                            class="h-5 w-5 transition-opacity duration-300 ease-in-out text-daytistics-secondary"
                        />
                        <span
                            v-if="isSidebarOpen"
                            class="ml-3 text-sm font-medium"
                            >{{ item.name }}</span
                        >
                    </a>
                </nav>

                <!-- Settings Popover -->
                <div class="absolute bottom-0 w-full border-t p-4">
                    <Popover
                        v-slot="{ open }"
                        class="relative"
                    >
                        <PopoverButton
                            class="flex items-center w-full rounded-lg hover:bg-gray-100 transition-colors py-2"
                            :class="{
                                'justify-center': !isSidebarOpen,
                                'pl-2': isSidebarOpen,
                                'bg-gray-100': open,
                            }"
                        >
                            <CircleUserRound
                                class="h-5 w-5 transition-opacity duration-300 ease-in-out"
                            />
                            <span
                                v-if="isSidebarOpen"
                                class="ml-3 text-sm font-medium"
                                >Account</span
                            >
                        </PopoverButton>

                        <transition
                            enter-active-class="transition duration-200 ease-out"
                            enter-from-class="translate-y-1 opacity-0"
                            enter-to-class="translate-y-0 opacity-100"
                            leave-active-class="transition duration-150 ease-in"
                            leave-from-class="translate-y-0 opacity-100"
                            leave-to-class="translate-y-1 opacity-0"
                        >
                            <PopoverPanel
                                class="absolute bottom-full mb-2 left-0 w-56 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 p-2"
                            >
                                <!-- Dark Mode Switch -->
                                <div
                                    class="flex items-center justify-between p-2 rounded-md hover:bg-gray-50"
                                >
                                    <div class="flex items-center">
                                        <Sun
                                            v-if="!isDarkMode"
                                            class="h-4 w-4 mr-2"
                                        />
                                        <Moon
                                            v-else
                                            class="h-4 w-4 mr-2"
                                        />
                                        <span class="text-sm font-medium">Dark Mode</span>
                                    </div>
                                    <button
                                        @click="toggleDarkMode"
                                        class="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                                        :class="isDarkMode ? 'bg-green-500' : 'bg-gray-200'"
                                    >
                                        <span
                                            class="inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out"
                                            :class="isDarkMode ? 'translate-x-4' : 'translate-x-0'"
                                        />
                                    </button>
                                </div>

                                <div class="h-px bg-gray-200 my-2" />

                                <!-- Settings Button -->
                                <button
                                    class="flex w-full items-center p-2 rounded-md hover:bg-gray-50 text-sm font-medium"
                                    @click="openSettings"
                                >
                                    <Cog class="h-4 w-4 mr-2" />
                                    Settings
                                </button>

                                <!-- Logout Button -->
                                <button
                                    class="flex w-full items-center p-2 rounded-md hover:bg-gray-50 text-sm font-medium text-red-600"
                                    @click="signOut"
                                >
                                    <LogOut class="h-4 w-4 mr-2" />
                                    Logout
                                </button>
                            </PopoverPanel>
                        </transition>
                    </Popover>
                </div>
            </div>
        </aside>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
    Menu,
    X,
    CirclePlay,
    Home,
    Users,
    FileText,
    CircleUserRound,
    Sun,
    Moon,
    LogOut,
    Cog,
} from 'lucide-vue-next';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';

const client = useSupabaseClient();

// Navigation items with icons
const navigationItems = [
    { name: 'Dashboard', href: '#', icon: Home },
    { name: 'Team', href: '#', icon: Users },
    { name: 'Documents', href: '#', icon: FileText },
];

// Sidebar state
const isSidebarOpen = ref(false);
const isMobile = ref(false);
const isDarkMode = ref(false);

// Toggle sidebar
const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};

// Toggle dark mode
const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    // Hier könnte die Dark Mode Logik implementiert werden
    document.documentElement.classList.toggle('dark');
};

const signOut = async () => {
    console.log('Signing out');
    await client.auth.signOut();
    await navigateTo('/');
};

// Open settings
const openSettings = () => {};

// Check if device is mobile and update on resize
const checkMobile = () => {
    isMobile.value = window.innerWidth < 768;
};

// Set up resize listener
onMounted(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
});
</script>

<style>
/* Optional: Fügen Sie diese Styles hinzu, wenn Sie den Dark Mode implementieren möchten */
:root {
    --background-color: white;
    --text-color: black;
}

.dark {
    --background-color: #1a1a1a;
    --text-color: white;
}
</style>
