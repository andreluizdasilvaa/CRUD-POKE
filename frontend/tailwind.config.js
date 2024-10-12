/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}'],
    theme: {
        extend: {
            boxShadow: {
                custom: '5px 5px 0px #7B00FF',
                customtwo: '5px 5px 0px white',
            },
        },
    },
    plugins: [],
};
