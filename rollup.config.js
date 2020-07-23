import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import svelte from "rollup-plugin-svelte";
import { terser } from "rollup-plugin-terser";
import config from "sapper/config/rollup.js";
import sveltePreprocess from "svelte-preprocess";

import pkg from "./package.json";

const node_env = process.env.NODE_ENV;
const dev = node_env === "development";
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) =>
    (warning.code === "CIRCULAR_DEPENDENCY" &&
        /[/\\]@sapper[/\\]/.test(warning.message)) ||
    onwarn(warning);

export default {
    client: {
        input: config.client.input().replace(/\.js$/, ".ts"),
        output: config.client.output(),
        plugins: [
            replace({
                "process.browser": true,
                "process.env.NODE_ENV": JSON.stringify(node_env),
            }),
            svelte({
                dev,
                hydratable: true,
                emitCss: true,
                preprocess: sveltePreprocess({
                    typescript: {},
                    pug: {},
                    scss: {},
                }),
            }),
            resolve({
                browser: true,
                dedupe: ["svelte"],
            }),
            commonjs(),
            typescript(),

            legacy &&
                babel({
                    extensions: [".js", ".mjs", ".html", ".svelte"],
                    runtimeHelpers: true,
                    exclude: ["node_modules/@babel/**"],
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                targets: "> 0.25%, not dead",
                            },
                        ],
                    ],
                    plugins: [
                        "@babel/plugin-syntax-dynamic-import",
                        [
                            "@babel/plugin-transform-runtime",
                            {
                                useESModules: true,
                            },
                        ],
                    ],
                }),

            !dev &&
                terser({
                    module: true,
                }),
        ],
        preserveEntrySignatures: false,
        onwarn,
    },

    server: {
        input: config.server.input().server.replace(/\.js$/, ".ts"),
        output: config.server.output(),
        plugins: [
            replace({
                "process.browser": false,
                "process.env.NODE_ENV": JSON.stringify(node_env),
                "module.require": "require",
            }),
            svelte({
                generate: "ssr",
                dev,
                preprocess: sveltePreprocess({
                    typescript: {},
                    pug: {},
                    scss: {},
                }),
            }),
            resolve({
                dedupe: ["svelte"],
            }),
            commonjs(),
            typescript(),
        ],
        external: Object.keys(pkg.dependencies).concat(
            require("module").builtinModules ||
                Object.keys(process.binding("natives")),
        ),
        preserveEntrySignatures: "strict",
        onwarn,
    },

    serviceworker: {
        input: config.serviceworker.input().replace(/\.js$/, ".ts"),
        output: config.serviceworker.output(),
        plugins: [
            resolve(),
            replace({
                "process.browser": true,
                "process.env.NODE_ENV": JSON.stringify(node_env),
            }),
            commonjs(),
            typescript(),
            !dev && terser(),
        ],
        preserveEntrySignatures: false,
        onwarn,
    },
};
