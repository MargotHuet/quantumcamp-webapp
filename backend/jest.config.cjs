/** @type {import('jest').Config} */
module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  esModuleInterop: true,
  preset: "ts-jest/presets/default-esm", 
  transform: {},
  extensionsToTreatAsEsm: [".ts"],
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  collectCoverageFrom: ["src/**/*.ts"],
  roots: ["<rootDir>/test"],
  collectCoverageFrom: ["src/**/*.ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1"
},
testTimeout: 10000,
};
