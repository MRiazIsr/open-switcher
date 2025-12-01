/** @type {import('postcss-load-config').Config} */
const config = {
    plugins: {
        // Внимание: здесь мы меняем 'tailwindcss' на '@tailwindcss/postcss'
        '@tailwindcss/postcss': {},
        autoprefixer: {},
    },
};

export default config;