module.exports = {
    rootDir: "./",
    roots: [
        "<rootDir>/src"
    ],
    transform: {
        "^.+\\.(ts|tsx)?$": "ts-jest"
    },
    testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
    moduleFileExtensions: [
        "ts",
        "js",
        "json",
    ],
    testPathIgnorePatterns: [
        "<rootDir>/node_modules/"
    ],
    cacheDirectory: ".jest/cache",
    coverageDirectory: "<rootDir>/coverage",
}
