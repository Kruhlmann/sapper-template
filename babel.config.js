module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: "> 0.25%, not dead",
            },
        ],
        "@babel/preset-typescript",
    ],
    plugins: [
        "babel-plugin-transform-typescript-metadata",
        [
            "@babel/plugin-proposal-decorators",
            {
                legacy: true,
            },
        ],
        [
            "@babel/plugin-proposal-class-properties",
            {
                loose: true,
            },
        ],
    ],
};
