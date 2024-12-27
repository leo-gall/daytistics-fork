<template>
    <div class="max-w-4xl mx-auto flex flex-col space-y-4">
        <DashboardActivityPlayer />
        <DashboardDaytisticsList />
        <DashboardWeekCalendar />
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: 'dashboard',
});

useHead({
    title: 'Daytistics • Dashboard',
});
</script>
