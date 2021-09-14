/**
 * The engine of dive-into-source
 *
 */

const fileHandlers = require('./file')
const Language = require('./language.js')
const languageModules = require('./languages')
const Feature = require('./feature.js')
const featureModules = require('./features')

class Engine {
  constructor(config) {
    this.config = config
    this.cache = {} // Cache feature result
    this.ctx = {
      config,
      languagesMap: new Map(),
      features: [],
    }
    const language = new Language(languageModules)
    language.register(this)
    const feature = new Feature(featureModules)
    feature.register(this)
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
