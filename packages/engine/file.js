/**
 * Process files
 *
 */

const fs = require('fs')
const fsPromises = require('fs').promises

const excludeDirs = ['.git']

// TODO: Add File class

async function readFiles(filePath) {
  console.log(`Start process: ${filePath}`)
  const content = await fsPromises.readFile(filePath, { encoding: 'utf-8' })
  console.log(`End process: ${filePath}`)
  return content
}

async function readDirs(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`Path: "${dirPath}" not existed`)
    return
  }

  let files = []
  const options = { withFileTypes: true, encoding: 'utf-8' }
  const nodes = await fsPromises.readdir(dirPath, options).catch(err => {
    console.log(err.message)
    return []
  })

  if (!nodes.length) {
    return
  }

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
