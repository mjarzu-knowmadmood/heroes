module.exports = {
  preset: "jest-preset-angular",
  roots: ["src"],
  testMatch: ["**/+(*.)+(spec).+(ts)"],
  setupFilesAfterEnv: ["<rootDir>/src/test-setup.ts"],
  coverageReporters: ["json-summary", "text", "lcov"],
};
