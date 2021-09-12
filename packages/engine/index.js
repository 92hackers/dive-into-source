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
    const allFiles = await fileHandlers.readDirs(repoPath)
    if (!allFiles) {
      return
    }
    Promise.all(allFiles.map(filePath => fileHandlers.readFiles(filePath)))
  }
}

module.exports = Engine
