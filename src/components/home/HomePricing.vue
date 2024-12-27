<script setup lang="ts">
import { Bird, Coins, Handshake, SearchCheck, SearchX, Server } from 'lucide-vue-next';
import { ref } from 'vue';

const CURRENTLY_FREE = true;

const pricingPlans = ref([
    {
        popular: true,
        type: 'Free',
        title: `It's totally free`,
        price: '0$',
        button: {
            text: 'Default Plan',
        },
        icon: Bird,
        features: [
            { isChecked: true, text: '10 analyses/month' },
            { isChecked: false, text: 'Interactive Analyses' },
            { isChecked: false, text: 'Basic Visualizations' },
            { isChecked: false, text: 'Custom Dashboards' },
            { isChecked: false, text: 'Permanent Data Backup' },
            { isChecked: false, text: 'Early Access' },
        ],
    },
    {
        type: 'Premium',
        title: `Pay-As-You-Go`,
        price: '29$',
        discountPrice: '39$',
        button: {
            text: 'Get the plan',
        },
        icon: Handshake,
        features: [
            { isChecked: true, text: 'Up to 1 User' },
            { isChecked: true, text: '100k free tokens/month' },
            { isChecked: true, text: 'Visualizations' },
            { isChecked: true, text: 'Free Updates' },
            { isChecked: true, text: 'Data export' },
            { isChecked: true, text: 'Permanent Data Backup' },
            { isChecked: false, text: 'Early Access' },
        ],
    },
    {
        type: 'Self-Hosted',
        title: `Host it yourself`,
        price: '59$',
        discountPrice: '99$',
        button: {
            text: 'Donate now',
        },
        icon: Server,
        features: [
            { isChecked: true, text: 'Up to 1 User' },
            { isChecked: true, text: '100k free tokens/month' },
            { isChecked: true, text: 'Visualizations' },
            { isChecked: true, text: 'Free Updates' },
            { isChecked: true, text: 'Data export' },
            { isChecked: true, text: 'Permanent Data Backup' },
            { isChecked: true, text: 'Early Access' },
        ],
    },
]);
</script>

<template>
    <!-- ====== Pricing Section Start -->
    <section
        id="pricing"
        class="relative z-20 overflow-hidden bg-white pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]"
    >
        <div class="container mx-auto">
            <div class="flex flex-wrap -mx-4">
                <div class="w-full px-4">
                    <div class="mx-auto mb-[60px] max-w-[600px] text-center">
                        <span class="block mb-2 text-lg font-semibold text-day-primary">
                            Our Pricing Plans
                        </span>
                        <h2
                            class="mb-4 text-3xl leading-[1.208] font-bold text-daytistics-gray-dark sm:text-4xl md:text-[40px]"
                        >
                            Ready to feel better?
                        </h2>
                        <p class="mx-auto max-w-[510px] text-base text-daytistics-gray-dark">
                            Choose the plan that fits your needs best, or take full control by
                            hosting it yourself with our open-source version.
                        </p>
                        <p
                            v-if="CURRENTLY_FREE"
                            class="mt-4 text-lg font-semibold text-day-primary"
                        >
                            All features remain free during the beta phase
                        </p>
                    </div>
                </div>
            </div>

            <div class="flex flex-wrap justify-center -mx-4">
                <template
                    v-for="(plan, index) in pricingPlans"
                    :key="index"
                >
                    <div class="w-full px-4 md:w-1/2 xl:w-1/4">
                        <div class="p-8 bg-white border shadow-pricing-4 rounded-xl border-stroke">
                            <div class="pb-8 border-b border-stroke">
                                <div class="mb-[22px] flex justify-between">
                                    <div>
                                        <h3
                                            class="text-[22px] leading-7 mb-1 font-semibold text-daytistics-gray-dark"
                                        >
                                            {{ plan.type }}
                                        </h3>
                                        <p class="text-base text-body-color">
                                            {{ plan.title }}
                                        </p>
                                    </div>
                                    <component
                                        :is="plan.icon"
                                        class="h-[34px] w-auto text-day-primary"
                                    />
                                </div>

                                <button
                                    :class="{
                                        'flex w-full items-center justify-center rounded-md bg-daytistics-gray-medium py-[10px] text-base font-medium text-white hover:bg-daytistics-gray-dark':
                                            plan.popular,
                                        'flex w-full items-center justify-center rounded-md bg-day-primary py-[10px] text-base font-medium text-white hover:bg-day-secondary':
                                            !plan.popular,
                                    }"
                                >
                                    {{ plan.button.text }}
                                </button>
                            </div>

                            <div class="pt-8 relative">
                                <div
                                    v-if="CURRENTLY_FREE"
                                    class="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-10"
                                >
                                    <p class="text-day-primary font-semibold text-center">
                                        Free during beta phase
                                    </p>
                                </div>
                                <div class="space-y-[14px]">
                                    <template
                                        v-for="(item, index) in plan.features"
                                        :key="index"
                                    >
                                        <p
                                            class="flex items-center text-base text-daytistics-gray-dark"
                                        >
                                            <span
                                                class="pr-[10px]"
                                                v-if="item.isChecked"
                                            >
                                                <SearchCheck
                                                    width="20"
                                                    height="20"
                                                    class="text-green-500"
                                                />
                                            </span>

                                            <span
                                                class="pr-[10px]"
                                                v-if="!item.isChecked"
                                            >
                                                <SearchX
                                                    width="20"
                                                    height="20"
                                                    class="text-red-500"
                                                />
                                            </span>
                                            {{ item.text }}
                                        </p>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </section>
</template>
