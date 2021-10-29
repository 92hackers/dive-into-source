/**
 * Test with Jest
 */

const File = require('../file')

test('Get excluded dirs from ignoreDirs', async () => {
  const config = {
    ignoreDirs: ['.git'],
  }
  const fileHandlers = new File({ config })
  await fileHandlers.addIgnoreRules()

  expect(fileHandlers.gitIgnoreManager.ignores('.git')).toBe(true)
  expect(fileHandlers.gitIgnoreManager.ignores('.ggit')).toBe(false)
})

test('Make sure readDirs function always return array []', async () => {
  const fileHandlers = new File({ config: {} })
  const allFiles = await fileHandlers.readDir('./xxx')
  expect(Array.isArray(allFiles)).toBe(true)
  expect(allFiles.length).toBe(0)
})
