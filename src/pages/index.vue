<script setup lang="ts"></script>

<template>
    <Jumbotron
        :typing-texts="[
            'Track Your Days, Transform Your Life',
            'Empowering your daily insights',
            'Data-Driven Insights for Better Living',
        ]"
        title="Welcome to Daytistics"
        :subtitle="subtitle"
    />
    <hr />
    <HomeFaq />
    <hr />
    <HomePricing />
    <hr />
</template>

<script setup lang="ts">
const subtitle = ref(`Daytistics is a simple app to track your activities, mood, and journal
                entries. It helps you discover patterns and improve your well-being.
                Clean visuals make tracking and insights effortless.`);
</script>
