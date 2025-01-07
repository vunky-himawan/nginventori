import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/hooks/(.*)$": "<rootDir>/src/app/_hooks/$1",
    "^@/app/(.*)$": "<rootDir>/src/app/$1",
    "^@/common/(.*)$": "<rootDir>/src/common/$1",
    "^@/libs/(.*)$": "<rootDir>/src/libs/$1",
    "^@/server/(.*)$": "<rootDir>/src/server/$1",
    "^@/types/(.*)$": "<rootDir>/src/types/$1",
    "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@/components/(.*)$": "<rootDir>/src/app/_components/$1",
    "^@/errors/(.*)$": "<rootDir>/src/errors/$1",
    "^@/responses/(.*)$": "<rootDir>/src/responses/$1",
  },
  testMatch: ["**/__tests__/**/*.+(ts|tsx|js)", "**/?(*.)+(spec|test).+(ts|tsx|js)"],
};

export default createJestConfig(config);
