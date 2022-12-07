export default {
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },

  testEnvironment: 'jsdom',
  setupFiles: ['jest-canvas-mock'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
}