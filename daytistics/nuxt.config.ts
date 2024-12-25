// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // NUXT CONFIGURATION
    compatibilityDate: '2024-04-03',
    devtools: {
        enabled: true,

        timeline: {
            enabled: true,
        },
    },

    build: {
        transpile: ['@vuepic/vue-datepicker'],
    },

    components: [
        { path: '~/components/global', pathPrefix: false },
        { path: '~/components/icons', pathPrefix: false },
        '~/components',
    ],

    runtimeConfig: {
        turnstile: {
            secretKey: process.env.TURNSTILE_SECRET_KEY,
        },
        public: {
            apiAddress: process.env.API_ADDRESS,
            isSelfHosted: process.env.SELF_HOSTED === 'true',
        },
    },

    app: {
        head: {
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
        },
    },

    css: ['~/assets/css/tailwind.css'],

    // MODULES & MODULE CONFIGURATION
    modules: [
        '@nuxt/image',
        '@nuxtjs/tailwindcss',
        '@nuxt/test-utils/module',
        '@pinia/nuxt',
        'floating-vue/nuxt',
        '@nuxt/eslint',
        '@nuxtjs/supabase',
        'nuxt-security',
        '@nuxtjs/turnstile',
    ],

    tailwindcss: {
        cssPath: ['~/assets/css/tailwind.css', { injectPosition: 'last' }],
    },

    image: {
        dir: 'assets/media',
    },

    postcss: {
        plugins: {
            autoprefixer: {},
            tailwindcss: {},
            'postcss-nested': {},
        },
    },

    supabase: {
        redirectOptions: {
            login: '/',
            callback: '/confirm',
            include: ['/dashboard/**'],
        },
    },

    turnstile: {
        siteKey: process.env.TURNSTILE_SITE_KEY,
        addValidateEndpoint: true,
    },
});
