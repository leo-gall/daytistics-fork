<template>
    <section class="relative z-10 bg-white py-20 lg:py-[120px]">
        <div class="container mx-auto">
            <div class="overflow-hidden rounded-xl bg-[#F0F4FF]">
                <div class="flex flex-wrap -mx-4">
                    <div class="w-full px-4 lg:w-1/2">
                        <div class="relative z-10 px-8 py-10 sm:p-14 lg:pb-24">
                            <h2
                                class="mb-6 text-3xl font-semibold text-white sm:text-4xl md:text-[40px]/[48px]"
                            >
                                #Daytistics
                            </h2>
                            <p class="max-w-[280px] text-base text-white">
                                You deserve to be happy. Let's make it happen together.
                            </p>
                            <div>
                                <span class="absolute left-0 bottom-0 z-[-1]">
                                    <svg
                                        class="text-primary"
                                        width="585"
                                        height="400"
                                        viewBox="0 0 585 400"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M585 -6H0V400C168.393 400 570.581 310.231 585 -6Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </span>
                                <span class="absolute left-0 bottom-0 z-[-2]">
                                    <svg
                                        class="text-secondary"
                                        width="392"
                                        height="189"
                                        viewBox="0 0 392 189"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M391.516 189H0V28C301.088 -64.8 386.464 96.6667 391.516 189Z"
                                            fill="currentColor "
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="self-center w-full px-4 lg:w-1/2">
                        <div class="relative z-10 px-6 py-9 sm:p-10">
                            <p class="mb-6 text-2xl font-semibold text-dark">
                                <ClientOnly>
                                    <AutoTyping
                                        class="min-h-8"
                                        :texts="[
                                            'Track Your Days, Transform Your Life',
                                            'Empowering your daily insights',
                                            'Data-Driven Insights for Better Living',
                                        ]"
                                    />
                                </ClientOnly>
                            </p>
                            <div class="flex flex-row gap-3">
                                <button
                                    type="button"
                                    class="button text-lg"
                                >
                                    <span>Get Started</span>
                                </button>
                                <button
                                    type="button"
                                    class="button text-lg bg-transparent border-2 border-primary hover:bg-primary/50 text-dark flex flex-row gap-2"
                                >
                                    <svg
                                        width="22"
                                        height="22"
                                        viewBox="0 0 300 300"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clip-path="url(#clip0_1_4)">
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M66.4284 274.26C134.876 320.593 227.925 302.666 274.258 234.219C320.593 165.771 302.666 72.7222 234.218 26.3885C165.77 -19.9451 72.721 -2.0181 26.3873 66.4297C-19.9465 134.877 -2.01938 227.927 66.4284 274.26ZM47.9555 116.67C30.8375 169.263 36.5445 221.893 59.2454 256.373C18.0412 217.361 7.27564 150.307 36.9437 92.318C55.9152 55.2362 87.5665 29.3937 122.5 18.3483C90.5911 36.7105 62.5549 71.8144 47.9555 116.67ZM175.347 283.137C211.377 272.606 244.211 246.385 263.685 208.322C293.101 150.825 282.768 84.4172 242.427 45.2673C264.22 79.7626 269.473 131.542 252.631 183.287C237.615 229.421 208.385 265.239 175.347 283.137ZM183.627 266.229C207.945 245.418 228.016 210.604 236.936 168.79C251.033 102.693 232.551 41.1978 195.112 20.6768C214.97 47.3945 225.022 99.2902 218.824 157.333C214.085 201.724 200.814 240.593 183.627 266.229ZM63.7178 131.844C49.5155 198.43 68.377 260.345 106.374 280.405C85.9962 254.009 75.5969 201.514 81.8758 142.711C86.5375 99.0536 99.4504 60.737 116.225 35.0969C92.2678 55.983 72.5384 90.4892 63.7178 131.844ZM199.834 149.561C200.908 217.473 179.59 272.878 152.222 273.309C124.853 273.742 101.797 219.039 100.724 151.127C99.6511 83.2138 120.968 27.8094 148.337 27.377C175.705 26.9446 198.762 81.648 199.834 149.561Z"
                                                fill="#0062FF"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1_4">
                                                <rect
                                                    width="300"
                                                    height="300"
                                                    fill="white"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span>Support Us</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
