/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
        esModuleInterop: true,
        types: ['jest', '@testing-library/jest-dom'],
      },
    }],
  },
  moduleNameMapper: {
    // import.meta.env can't compile under Jest (CJS), so swap the whole helper
    '/getEnvVariables$': '<rootDir>/src/helpers/__mocks__/getEnvVariables.ts',
    '\\.css$': 'identity-obj-proxy',
    '\\.(png|jpe?g|svg)$': '<rootDir>/src/__mocks__/fileMock.cjs',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
