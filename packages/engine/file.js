/**
 * Process files
 *
 */

const path = require('path')
const fsPromises = require('fs').promises
const ignore = require('ignore')

class File {
  constructor(engineCtx) {
    this.engineCtx = engineCtx
    this.gitIgnoreManager = ignore()
  }

  /**
   * Analyze file
   */
  async analyzeFile(filePath) {
    const { languagesMap, features } = this.engineCtx

    const matchLanguage = languagesMap.get(path.extname(filePath))
    if (matchLanguage === undefined) {
      this.engineCtx.ignoredFilesCount += 1
      return
    }

    const fd = await fsPromises.open(filePath, 'r').catch(err => {
      if (err.code === 'EMFILE') { // If too many open files error, try again later
        return ''
      }
      throw err // Throw out rest errors
    })
    if (!fd) {
      return filePath // Return file path back to try again later
    }

    const content = await fd.readFile({ encoding: 'utf-8' })
    await Promise.all(features.map(feature => feature.run({ matchLanguage, content })))
    fd.close() // Close fd to release file descriptors
  }

  /**
   * Read source code repo dir to get all files
   */
  async readDir(dirPath) {
    const self = this

    // Wait for file ignore rules parsed.
    await this.addIgnoreRules()

    async function readDirRecursive(dir) {
      const files = []
      const dirs = []
      const options = { withFileTypes: true, encoding: 'utf-8' }
      const nodes = await fsPromises.readdir(dir, options).catch(err => {
        console.log(err.message)
        return []
      })

      nodes.forEach((node) => {
        const nodePath = `${dir}/${node.name}`

        // Filter ignored files
        const relativeToRootPath = path.relative(self.engineCtx.repoPath, nodePath)
        if (self.gitIgnoreManager.ignores(relativeToRootPath)) {
          return
        }

        if (node.isDirectory()) {
          dirs.push(nodePath)
        } else if (node.isFile()) {
          files.push(nodePath)
        }
      })

      const nestedFiles = await Promise.all(dirs.map(subDir => readDirRecursive(subDir)))
      return files.concat(...nestedFiles)
    }

    const allFiles = await readDirRecursive(dirPath)
    return allFiles
  }

  /**
   * Add ignore path rules
   *
   * Parse ignoreDirs and .gitignore file
   */
  async addIgnoreRules() {
    const { ignoreDirs, gitIgnoreFilePath } = this.engineCtx.config
    const { repoPath } = this.engineCtx

    // Process ignoreDirs
    if (ignoreDirs) {
      this.gitIgnoreManager.add(ignoreDirs)
    }

    // Process .gitignore file
    if (!gitIgnoreFilePath) {
      return
    }
    const ignoreFileAbsolutePath = path.resolve(repoPath, gitIgnoreFilePath)
    const gitIgnoreFile = await fsPromises.readFile(ignoreFileAbsolutePath, 'utf-8').catch(() => {
      console.warn(`.gitignore file not found in dir: ${repoPath}, No .gitignore file will be parsed!`)
    })
    if (gitIgnoreFile) {
      console.log(`The .gitignore file: ${ignoreFileAbsolutePath} found.`)
      console.log('All files and dirs listed in .gitignore file will be ignored.')
    }
    this.gitIgnoreManager.add(gitIgnoreFile)
  }
}

module.exports = File
