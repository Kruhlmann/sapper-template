import config from "sapper/config/rollup.js";

import { make_plugin_configuration } from "./config/rollup-plugins";
import { handle_warning } from "./config/rollup-on-warning";
import package_json from "./package.json";

const NODEJS_ENVIRONMENT = process.env.NODE_ENV;
const IN_DEVELOPMENT_MODE = NODEJS_ENVIRONMENT === "development";
const IS_LEGACY = !!process.env.SAPPER_LEGACY_BUILD;

export default {
    client: {
        input: config.client.input().replace(/\.js$/, ".ts"),
        output: config.client.output(),
        plugins: make_plugin_configuration(
            NODEJS_ENVIRONMENT,
            IN_DEVELOPMENT_MODE,
            IS_LEGACY,
            false,
        ),
        preserveEntrySignatures: false,
        onwarn: handle_warning,
    },

    server: {
        input: config.server.input().server.replace(/\.js$/, ".ts"),
        output: config.server.output(),
        plugins: make_plugin_configuration(
            NODEJS_ENVIRONMENT,
            IN_DEVELOPMENT_MODE,
            IS_LEGACY,
            true,
        ),
        external: Object.keys(package_json.dependencies).concat(
            require("module").builtinModules ||
                Object.keys(process.binding("natives")),
        ),
        preserveEntrySignatures: "strict",
        onwarn: handle_warning,
    },

    serviceworker: {
        input: config.serviceworker.input().replace(/\.js$/, ".ts"),
        output: config.serviceworker.output(),
        plugins: make_plugin_configuration(
            NODEJS_ENVIRONMENT,
            IN_DEVELOPMENT_MODE,
            IS_LEGACY,
            true,
        ),
        preserveEntrySignatures: false,
        onwarn: handle_warning,
    },
};
