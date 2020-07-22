module.exports = {
    collectCoverage: true,
    testRegex: "(/__tests__/.*|(\\.|/)(test))\\.(jsx?|tsx?)$",
    testResultsProcessor: "jest-sonar-reporter",
    transform: {
        "^.+\\.svelte$": "svelte-jester",
        "^.+\\.js$": "babel-jest",
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "svelte"],
};
