import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  runner: 'jest-runner-tsd',
  collectCoverage: false,
  testMatch: ['<rootDir>/test/**/*.tsd.test.ts'],
  verbose: true,
};

export default config;
