const {defaults} = require('jest-config');

module.exports = {
  verbose: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  setupFiles: [
    "<rootDir>/__test__/setup/test-shim.js",
    "<rootDir>/__test__/setup/test-setup.js",
  ],
  preset: "ts-jest/presets/js-with-ts",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/tests/setup/fileMock.js",
    "\\.(css|less)$": "<rootDir>/tests/setup/styleMock.js"
  },
  moduleDirectories: [
    "node_modules",
    "dist"
  ],
  testMatch: [
    "**/__test__/**/*.test.(ts|tsx|js)"
  ],

  collectCoverage: true
};