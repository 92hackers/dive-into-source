/**
 * Process files
 *
 */

const fsPromises = require('fs').promises

async function readFiles(filePath) {
  const content = await fsPromises.readFile(filePath, { encoding: 'utf-8' })
  return content
}

module.exports = {
  readFiles,
}
