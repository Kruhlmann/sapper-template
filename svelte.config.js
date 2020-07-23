const sveltePreprocess = require("svelte-preprocess");

const development = process.env.NODE_ENV === "development";

module.exports.preprocess = sveltePreprocess({
    typescript: {
        transpileOnly: development,
    },
    pug: {
        pretty: true,
    },
    scss: {},
});
