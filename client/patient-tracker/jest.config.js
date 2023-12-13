module.exports = {
    // Other Jest configurations
    testEnvironment: 'jsdom',

    collectCoverage: true,

    moduleNameMapper: {
        '\\.(css|less|scss)$': '<rootDir>/src/components/Login/Login.mock.css',
      },
  
    transformIgnorePatterns: [
      '/node_modules/', // Default ignore patterns for node_modules
      '\\.(css|less|scss|sass)$', // Exclude CSS files from transformation
    ]
  };
  