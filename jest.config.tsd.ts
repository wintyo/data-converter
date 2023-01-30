import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  runner: 'jest-runner-tsd',
  collectCoverage: false,
  testMatch: ['<rootDir>/__typetests__/*.test.ts'],
  verbose: true,
};

export default config;
