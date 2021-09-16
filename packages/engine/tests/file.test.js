/**
 * Test with Jest
 */

const fileHandlers = require('../file')

test('Get excluded dirs from ignoreDirs', () => {
  const config = {
    ignoreDirs: ['.git'],
    ignoreDirsFiles: ['.gitignore'],
  }
  const excludeDirs = fileHandlers.getExcludedDirs(config)
  expect(excludeDirs.toString()).toBe('[object Set]')
  expect(excludeDirs.has('.git')).toBe(true)
});
