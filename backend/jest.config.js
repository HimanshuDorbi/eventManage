// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts?$': 'ts-jest', // Add this line to handle TypeScript files
    },
    moduleFileExtensions: ['ts', 'js'],
    testMatch: ['**/?(*.)+(test).ts?(x)'],
    moduleDirectories: ['node_modules', 'src'],
  };
  