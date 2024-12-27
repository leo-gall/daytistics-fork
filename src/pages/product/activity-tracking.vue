<script setup lang="ts">
import HomeFeature from '~/components/home/HomeFeature.vue';
</script>

<template>
    <Jumbotron
        title="Activity Tracking"
        subtitle="Easily track your daily activities and monitor your performance over time."
    />
    <hr />
    <HomeFeature
        image="https://img.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        feature="Activity Tracking"
        headline="Track your activities"
        description="Our activity tracking feature allows you to monitor and record your daily activities effortlessly. Whether you are exercising, working, or engaging in leisure activities, you can keep a detailed log and analyze your performance over time."
    />
    <hr />
    <HomeFeature
        image="https://img.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        feature="Well-being Tracking"
        headline="Track your well-being"
        description="You love to rate stuff? Then you will love our well-being tracking feature. Thanks to a simple star rating system, you can track your well-being with ease. This feature helps you to understand your mental and physical health better by providing insights and trends over time. You can easily log your mood, energy levels, and overall well-being, and use this data to make informed decisions about your lifestyle and habits."
        :reverse="true"
    />
    <hr />
    <FooterBanner />
</template>
