export default {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.core.{js,ts}',
    ],
    theme: {
        extend: {
            colors: {
                'day-primary': '#0e9f6e',
                'day-secondary': '#057a55',
                'day-tertiary': '#046c4e',
                'day-gray-light': '#f9fafb',
                'day-gray-medium': '#e5e7eb',
                'day-gray-dark': '#6b7280',
                gradient: {
                    1: '#4ade80',
                    2: '#3b82f6',
                },
                daytistics: {
                    primary: '#0e9f6e',
                    secondary: '#057a55',
                    tertiary: '#1A4E3F',
                    ivory: '#f9fafb',
                    gradient: {
                        1: '#4ade80',
                        2: '#3b82f6',
                    },
                    gray: {
                        light: '#e5e7eb',
                        medium: '#616161',
                        dark: '#313233',
                    },
                },
            },
            spacing: {
                '75px': '75px',
                '690px': '690px',
                '800px': '800px',
                '8xl': '88rem',
            },
        },
        fontFamily: {
            nunito: ['Nunito', 'sans-serif'],
        },
    },
    plugins: [],
};
