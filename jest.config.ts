import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  collectCoverage: false,
  testMatch: ['<rootDir>/src/**/*(?<!.tsd).test.[jt]s'],
  verbose: true,
};

export default config;