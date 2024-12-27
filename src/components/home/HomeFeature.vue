<template>
    <section class="bg-white py-20 lg:py-[120px]">
        <div class="container">
            <div
                class="flex flex-wrap items-center gap-10 lg:flex-nowrap lg:gap-14 2xl:gap-[100px]"
                :class="{ 'flex-row-reverse': reverse ?? false }"
            >
                <div class="w-full">
                    <div class="overflow-hidden rounded-[20px]">
                        <NuxtImg
                            :src="image"
                            format="webp"
                            :alt="`image showing the ${feature} feature`"
                            class="w-full object-cover object-center"
                        />
                    </div>
                </div>

                <div class="w-full">
                    <div>
                        <span class="mb-2 block text-lg font-semibold text-day-primary">
                            {{ feature }}
                        </span>
                        <h2
                            class="mb-3 text-3xl font-bold !leading-tight text-daytistics-gray-dark sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl"
                        >
                            {{ headline }}
                        </h2>
                        <p class="mb-12 text-base text-body-color">
                            {{ description }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
defineProps<{
    feature: string;
    headline: string;
    description: string;
    image: string;
    reverse?: boolean;
}>();
</script>
