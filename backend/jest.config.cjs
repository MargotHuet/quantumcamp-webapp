/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest/presets/default-esm", // Utilise ts-jest pour les ESModules
  transform: {},
  extensionsToTreatAsEsm: [".ts"],
  testEnvironment: "node", // Environnement Node.js
  moduleFileExtensions: ["ts", "js"],
  collectCoverageFrom: ["src/**/*.ts"],
  roots: ["<rootDir>/test"],
  collectCoverageFrom: ["src/**/*.ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1"
},
testTimeout: 10000,
};
