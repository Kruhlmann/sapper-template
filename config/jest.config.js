module.exports = {
    collectCoverage: true,
    roots: ["<rootDir>/.."],
    transform: {
        "^.+\\.mjs?$": "babel-jest",
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.svelte$": ["svelte-jester", { preprocess: true }],
    },
    testRegex: "../tests/(components|unit)/.*(feature|test|spec).tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "mjs", "json"],
    moduleNameMapper: {
        "^src/(.*)": "<rootDir>/src/$1",
    },
    moduleDirectories: ["node_modules", "src/node_modules"],
    transformIgnorePatterns: ["/node_modules/(?!@sapper)"],
    testEnvironment: "node",
};
