const eslint_svelte_preprocess = require("eslint-svelte3-preprocess");
const svelte_config = require("./svelte.config");

module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "eslint:recommended",
        "./node_modules/gts/",
        "plugin:cypress/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:unicorn/recommended",
    ],
    env: {
        es6: true,
        browser: true,
        "cypress/globals": true,
    },
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: "module",
    },
    plugins: [
        "eslint-plugin-tsdoc",
        "unicorn",
        "simple-import-sort",
        "import",
        "cypress",
        "html",
    ],
    rules: {
        indent: ["error", 4, { SwitchCase: 1 }],
        quotes: ["warn", "double"],
        "node/no-unpublished-import": 0,
        "tsdoc/syntax": "error",
        "unicorn/filename-case": "off",
        "simple-import-sort/sort": "error",
        complexity: ["error", 3],
        "sort-imports": "off",
        "import/first": "error",
        "import/newline-after-import": "error",
        "import/no-duplicates": "error",
    },
};
