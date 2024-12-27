<template>
    <LandingBetaBanner />
    <div class="min-h-screen flex flex-col z-10 relative">
        <header class="absolute top-0 left-0 z-50 w-full">
            <HomeNavbar />
        </header>
        <slot></slot>
    </div>
    <hr />
    <HomeFooter />
</template>

<script setup lang="ts">
useHead({
    title: 'Welcome to Daytistics',
});
</script>
