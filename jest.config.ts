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
  moduleNameMapper: {
    '^~/(.+)': '<rootDir>/src/$1',
  },
  collectCoverage: false,
  testMatch: ['<rootDir>/test/**/*(?<!.tsd).test.[jt]s'],
  verbose: true,
};

export default config;
