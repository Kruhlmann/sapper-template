const svelte_preprocess = require("svelte-preprocess");

const dev = process.env.NODE_ENV === "development";

module.exports = {
    preprocess: svelte_preprocess({
        typescript: {
            transpileOnly: dev,
        },
    }),
};
