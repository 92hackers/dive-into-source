/**
 * The engine of dive-into-source
 *
 */

const fs = require('fs')
const path = require('path')
const fileHandlers = require('./file')
const Language = require('./language.js')
const languageModules = require('./languages')
const Feature = require('./feature.js')
const featureModules = require('./features')

class Engine {
  constructor(config) {
    this.config = config
    this.cache = {}
    this.secondsConsumed = 0
    this.maxTries = 10
    this.ctx = {
      totalFilesCount: 0,
      ignoredFilesCount: 0,
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
    const start = new Date()
    const { repoPath } = this.config
    const dirPath = path.resolve(repoPath)
    if (!fs.existsSync(dirPath)) {
      console.log(`Path: "${repoPath}" not existed`)
      return
    }
    const excludeDirs = fileHandlers.getExcludedDirs(this.config)
    const allFiles = await fileHandlers.readDirs(dirPath, excludeDirs)
    const allFilesCount = allFiles.length
    if (!allFilesCount) {
      return
    }
    this.ctx.totalFilesCount = allFilesCount
    console.log(`Total ${allFilesCount} files found, start analyzing...`)

    let filesToProcess = allFiles
    while (1) { // eslint-disable-line no-constant-condition
      // eslint-disable-next-line max-len, no-await-in-loop
      const restFiles = await Promise.all(filesToProcess.map(filePath => fileHandlers.analyzeFile(filePath, this.ctx)))
      if (!restFiles.length) { // No more files to process
        break
      }
      filesToProcess = restFiles.filter(item => item)

      this.maxTries -= 1
      if (!this.maxTries) { // Max tries reached, exit
        break
      }
    }

    const end = new Date()
    this.secondsConsumed = (end - start) / 1000

    this.report()
  }

  report() {
    this.summaryReport()
    this.featuresReport()
  }

  summaryReport() {
    console.log('-------- Summary ----------------')
    console.log(`Total files: ${this.ctx.totalFilesCount}`)
    console.log(`Ignored files: ${this.ctx.ignoredFilesCount}`)
    console.log(`Time consumed: ${this.secondsConsumed}s`)
    console.log('---------------------------------')
  }

  featuresReport() {
    this.ctx.features.forEach((feature) => {
      console.log(`${feature.name} -----------------`)
      feature.report()
      console.log('----------------------------------')
    })
  }
}

module.exports = Engine
