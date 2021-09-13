/**
 * The engine of dive-into-source
 *
 */

const fileHandlers = require('./file')

class Engine {
  constructor(config) {
    this.config = config
    this.ctx = { config }
  }

  async run() {
    const { repoPath } = this.config
    const excludeDirs = fileHandlers.getExcludedDirs(this.config)
    const allFiles = await fileHandlers.readDirs(repoPath, excludeDirs)
    if (!allFiles) {
      return
    }
    Promise.all(allFiles.map(filePath => fileHandlers.analyzeFile(filePath)))
  }
}

module.exports = Engine
