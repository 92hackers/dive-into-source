/**
 * Process files
 *
 */

const fs = require('fs')
const fsPromises = require('fs').promises

/**
 * Analyze file
 */
async function analyzeFile(filePath) {
  console.log(`Start process: ${filePath}`)
  const content = await fsPromises.readFile(filePath, { encoding: 'utf-8' })
  console.log(`End process: ${filePath}`)
  return content
}

/**
 * Read source code repo dirs to get all files
 */
async function readDirs(dirPath, excludeDirs) {
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
      if (!excludeDirs.has(node.name)) {
        files = files.concat(await readDirs(nodePath, excludeDirs))
      }
    } else if (node.isFile()) {
      files.push(nodePath)
    }
  }

  return files
}

/**
 * Get exclude dirs,
 *
 * @return excludeDirs {Set}
 */
function getExcludedDirs(config) {
  const { ignoreDirs, ignoreDirsFiles } = config
  let excludeDirs = new Set()

  if (!ignoreDirs) {
    return excludeDirs
  }

  if (Array.isArray(ignoreDirs) && ignoreDirs.length > 0) {
    excludeDirs = new Set(ignoreDirs)
  }

  // TODO: parse .gitignore file
  return excludeDirs
}

module.exports = {
  analyzeFile,
  readDirs,
  getExcludedDirs,
}
