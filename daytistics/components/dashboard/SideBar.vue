<template>
    <div class="flex h-screen bg-white text-gray-900">
        <!-- Desktop Sidebar -->
        <div
            :class="[
                'hidden md:flex md:flex-col transition-all duration-300 ease-in-out',
                isCollapsed ? 'md:w-16' : 'md:w-64',
            ]"
        >
            <!-- Sidebar Header -->
            <div class="flex items-center justify-between p-4 border-b border-day-gray-medium">
                <NuxtLink
                    v-if="!isCollapsed"
                    aria-label="Return to Home"
                    to="/"
                    class="flex items-center space-x-2"
                >
                    <NuxtImg
                        src="/images/logo.png"
                        alt="Logo"
                        class="h-8 w-auto"
                    />
                    <span class="font-semibold text-lg">Daytistics</span>
                </NuxtLink>
                <button
                    aria-label="Toggle Sidebar"
                    @click="toggleSidebar"
                    class="p-1 rounded-md hover:bg-secondary/90 hover:text-white transition-colors duration-200"
                >
                    <ChevronLeft v-if="!isCollapsed" />
                    <ChevronRight v-else />
                </button>
            </div>

            <!-- Navigation Items -->
            <nav class="flex-1 overflow-y-auto">
                <ul class="p-2 space-y-2">
                    <li
                        :key="item.name"
                        v-for="item in navItems"
                    >
                        <NuxtLink
                            :aria-label="`Navigate to ${item.name}`"
                            :to="item.link"
                            :class="[
                                'flex items-center p-2 rounded-md transition-colors duration-200',
                                isCollapsed ? 'justify-center' : 'space-x-3',
                                matchesAnyPattern(path, item.paths)
                                    ? 'bg-secondary/90 text-white'
                                    : 'hover:bg-secondary/90 hover:text-white',
                            ]"
                        >
                            <component
                                v-tooltip="isCollapsed && item.name"
                                :is="item.icon"
                                class="h-5 w-5"
                            />
                            <span v-if="!isCollapsed">{{ item.name }}</span>
                        </NuxtLink>
                    </li>
                </ul>
            </nav>

            <!-- Bottom Section -->
            <div class="p-4 border-t border-day-gray-medium">
                <button
                    type="button"
                    @click="signOut"
                    aria-label="Navigate to Tokens"
                    :class="[
                        'flex items-center p-2 rounded-md transition-colors duration-200 hover:bg-secondary/90 hover:text-white w-full',
                        isCollapsed ? 'justify-center p-2' : 'space-x-3 p-2',
                    ]"
                >
                    <LogOut
                        v-tooltip="isCollapsed && 'Sign Out'"
                        class="h-5 w-5"
                    />
                    <span v-if="!isCollapsed">Sign Out</span>
                </button>
            </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1 flex flex-col">
            <!-- Mobile Bottom Navigation -->
            <div
                class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-day-gray-medium"
            >
                <nav class="flex justify-around">
                    <NuxtLink
                        v-for="item in navItems"
                        :aria-label="`Navigate to ${item.name}`"
                        :key="item.name"
                        :to="item.link"
                        :class="[
                            'flex flex-col items-center p-2 transition-colors duration-200',
                            matchesAnyPattern(path, item.paths)
                                ? 'text-primary'
                                : 'text-dark hover:text-secondary',
                        ]"
                    >
                        <component
                            :is="item.icon"
                            class="h-6 w-6"
                        />
                        <span class="text-xs mt-1">{{ item.name }}</span>
                    </NuxtLink>
                    <NuxtLink
                        aria-label="Navigate to Tokens"
                        key="tokens"
                        to="/tokens"
                        :class="[
                            'flex flex-col items-center p-2 transition-colors duration-200',
                            matchesAnyPattern(path, [/account\/tokens/i])
                                ? 'text-primary'
                                : 'text-dark hover:text-secondary',
                        ]"
                    >
                        <HandCoinsIcon class="h-6 w-6" />
                        <span class="text-xs mt-1"> Tokens </span>
                    </NuxtLink>
                </nav>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    ChevronLeft,
    ChevronRight,
    Home,
    Settings,
    Bot,
    LogOut,
    HandCoinsIcon,
} from 'lucide-vue-next';
import { matchesAnyPattern } from '../../utils/regex';

const isCollapsed = ref(false);
const tokens = ref<number>(0);
const path = ref(useRoute().path);
const client = useSupabaseClient();

async function signOut() {
    client.auth.signOut();
    await navigateTo('/');
}

const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value;
    console.log(path.value);
};

const navItems = [
    {
        name: 'Home',
        icon: Home,
        link: '/dashboard',
        paths: [/dashboard/i, /dashboard\/daytistics/i, /dashboard\/daytistics\/\d+/i],
    },
    {
        name: 'Suggestions',
        icon: Bot,
        link: '/dashboard/suggestions',
        paths: [/dashboard\/suggestions/],
    },
    {
        name: 'Settings',
        icon: Settings,
        link: '/account/settings',
        paths: [/account\/settings/],
    },
];

onMounted(async () => {
    tokens.value = await useEndpoints().payments.getTotalTokens();
});
</script>

<style scoped>
/* Custom scrollbar for Webkit browsers */
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: #2d3748;
}

::-webkit-scrollbar-thumb {
    background: #4a5568;
    border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
    background: #718096;
}

/* Prevent content from being hidden behind the mobile bottom navigation */
@media (max-width: 767px) {
    .pb-16 {
        padding-bottom: 5rem;
    }
}
</style>
