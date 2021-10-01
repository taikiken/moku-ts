module.exports = {
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  verbose: true,
  testMatch: ['**/__tests__/**/*.test.ts'],
}