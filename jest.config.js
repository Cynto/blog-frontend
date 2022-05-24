const nextJest = require('next/jest');
const createJestConfig = nextJest({
  dir: './',
});

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  automock: false,
  globals: {
    localStorage: new LocalStorageMock(),
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/lib/',
    '<rootDir>/cypress/',
  ],
};

module.exports = createJestConfig(customJestConfig);
