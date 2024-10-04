/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["./jest.setup.js"],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};
