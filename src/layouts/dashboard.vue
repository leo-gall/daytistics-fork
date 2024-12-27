<template>
    <div class="flex flex-row">
        <DashboardSidebar />
        <main class="flex-1 px-4 py-8 bg-daytistics-ivory">
            <slot />
        </main>
    </div>
</template>

<script lang="ts" setup></script>
