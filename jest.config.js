module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest'
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/$1',
      // Add these lines
      '^../book/entities/books.entity$': '<rootDir>/__mocks__/book.entity',
      '^../loan/entities/loan.entity$': '<rootDir>/__mocks__/loan.entity'
    }
  };