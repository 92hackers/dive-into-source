/**
 * Test with Jest
 */

const File = require('../file')

test('Get excluded dirs from ignoreDirs', () => {
  const config = {
    ignoreDirs: ['.git'],
    ignoreDirsFiles: ['.gitignore'],
  }
  const fileHandlers = new File()
  const excludeDirs = fileHandlers.getExcludedDirs(config)
  expect(excludeDirs.toString()).toBe('[object Set]')
  expect(excludeDirs.has('.git')).toBe(true)
})

test('Make sure readDirs function always return array []', async () => {
  const excludeDirs = new Set()
  const allFiles = await fileHandlers.readDirs('./xxx', excludeDirs)
  expect(Array.isArray(allFiles)).toBe(true)
  expect(allFiles.length).toBe(0)
})
