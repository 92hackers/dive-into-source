/**
 * Process files
 *
 */

const fs = require('fs')
const path = require('path')
const fsPromises = require('fs').promises

/**
 * Analyze file
 */
async function analyzeFile(filePath, engineCtx) {
  const { languagesMap, features } = engineCtx
  const matchLanguage = languagesMap.get(path.extname(filePath))
  if (matchLanguage === undefined) {
    engineCtx.ignoredFilesCount += 1
    return
  }
  const content = await fsPromises.readFile(filePath, { encoding: 'utf-8' })
  await Promise.all(features.map(feature => feature.run({ matchLanguage, content })))
}

/**
 * Read source code repo dirs to get all files
 */
async function readDirs(dirPath, excludeDirs) {
  if (!fs.existsSync(dirPath)) {
    console.log(`Path: "${dirPath}" not existed`)
    return []
  }

  const files = []
  const dirs = []
  const options = { withFileTypes: true, encoding: 'utf-8' }
  const nodes = await fsPromises.readdir(dirPath, options).catch(err => {
    console.log(err.message)
    return []
  })

  nodes.forEach((node) => {
    const nodePath = `${dirPath}/${node.name}`
    if (node.isDirectory()) {
      if (!excludeDirs.has(node.name)) {
        dirs.push(nodePath)
      }
    } else if (node.isFile()) {
      files.push(nodePath)
    }
  })

  const nestedFiles = await Promise.all(dirs.map(dir => readDirs(dir, excludeDirs)))
  return files.concat(...nestedFiles)
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
