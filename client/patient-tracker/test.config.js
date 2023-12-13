module.exports = {
    // Specify the test environment (e.g., jsdom for browser-like environment)
    testEnvironment: 'jsdom',
  
    // Define file patterns that Jest will use to find test files
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$',
  
    // Setup files before running tests
    setupFilesAfterEnv: ['c:/Users/rachn/OneDrive/Documents/SEM 1/CS 520/project/cs520_Patient_Tracker_untitled3/client/patient-tracker/src/setupTests.js'],
  
    // Define coverage settings (if you want to measure code coverage)
    collectCoverage: true,
    coverageReporters: ['text', 'lcov'],
  
    // Other Jest configurations can go here
  };
  