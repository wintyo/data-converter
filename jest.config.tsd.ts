import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  runner: 'jest-runner-tsd',
  collectCoverage: false,
  testMatch: ['<rootDir>/src/**/*.tsd.test.ts'],
  verbose: true,
};

export default config;
