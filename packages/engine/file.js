/**
 * Process files
 *
 */

const fsPromises = require('fs').promises

const excludeDirs = ['.git']

async function readFiles(filePath) {
  console.log(`Start process: ${filePath}`)
  const content = await fsPromises.readFile(filePath, { encoding: 'utf-8' })
  console.log(`End process: ${filePath}`)
  return content
}

async function readDirs(dirPath) {
  let files = []
  const options = { withFileTypes: true, encoding: 'utf-8' }
  const nodes = await fsPromises.readdir(dirPath, options)

  for (const node of nodes) {
    const nodePath = `${dirPath}/${node.name}`
    if (node.isDirectory()) {
      if (!excludeDirs.includes(node.name)) {
        files = files.concat(await readDirs(nodePath))
      }
    } else if (node.isFile()) {
      files.push(nodePath)
    }
  }

  return files
}

module.exports = {
  readFiles,
  readDirs,
}
