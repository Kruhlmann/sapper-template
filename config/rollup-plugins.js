import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import svelte_preprocess from "svelte-preprocess";
import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import * as babel_config from "../babel.config";

function make_babel_plugin_configuration() {
    return babel(babel_config);
}

function make_terser_plugin_configuration() {
    return terser({
        module: true,
    });
}

function make_replace_plugin_configuration(node_environment, is_server) {
    const replace_config = {
        "process.browser": true,
        "process.env.NODE_ENV": JSON.stringify(node_environment),
    };

    if (is_server) {
        replace_config["module.require"] = "require";
    }

    return replace(replace_config);
}

function make_svelte_plugin_configuration(is_server) {
    const svelte_config = {
        dev: false,
        hydratable: !is_server,
        emitCss: true,
        preprocess: svelte_preprocess({
            typescript: {},
            pug: {},
            scss: {},
        }),
    };

    if (!is_server) {
        svelte_config["hydratable"] = true;
        svelte_config["emitCss"] = true;
    } else {
        svelte_config["generate"] = "ssr";
    }

    return svelte(svelte_config);
}

function make_resolve_plugin_configuration(is_server) {
    return resolve({
        browser: !is_server,
        dedupe: ["svelte"],
    });
}

export function make_plugin_configuration(
    node_environment,
    is_in_development,
    is_legacy,
    is_server,
) {
    const rollup_plugin_configurations = [
        make_resolve_plugin_configuration(is_server),
        make_svelte_plugin_configuration(is_server),
        make_replace_plugin_configuration(node_environment, is_server),
        typescript(),
        commonjs(),
    ];

    if (is_legacy && !is_server) {
        rollup_plugin_configurations.push(make_babel_plugin_configuration());
    }

    if (!is_in_development) {
        rollup_plugin_configurations.push(make_terser_plugin_configuration());
    }

    return rollup_plugin_configurations;
}
