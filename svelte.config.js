import svelte_preprocess from "svelte-preprocess";

const dev = process.env.NODE_ENV === "development";

export const preprocess = svelte_preprocess({
    typescript: {
        // This returns compilation times back to what they're like without TypeScript
        // And still type checks for production builds
        // Use IDE tools for type checking during development instead
        transpileOnly: dev,
    },
});
