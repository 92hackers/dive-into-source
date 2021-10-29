/**
 * The engine of dive-into-source
 *
 */

const fs = require('fs')
const path = require('path')
const File = require('./file')
const Language = require('./language.js')
const languageModules = require('./languages')
const Feature = require('./feature.js')
const featureModules = require('./features')

class Engine {
  constructor(config) {
    this.cache = {}
    this.secondsConsumed = 0
    this.ctx = {
      totalFilesCount: 0,
      ignoredFilesCount: 0,
      config,
      languagesMap: new Map(),
      features: [],
      repoPath: '',
    }
    const language = new Language(languageModules)
    Object.seal(language)
    language.register(this)
    const feature = new Feature(featureModules)
    Object.seal(feature)
    feature.register(this)
  }

  async run() {
    const start = new Date()

    // Validate repo path
    const { repoPath } = this.ctx.config
    const dirPath = path.resolve(repoPath)
    if (!fs.existsSync(dirPath)) {
      console.log(`Path: "${repoPath}" not existed`)
      return
    }
    this.ctx.repoPath = dirPath

    const fileHandlers = new File(this.ctx)

    // Get all files
    const allFiles = await fileHandlers.readDir(dirPath)
    const allFilesCount = allFiles.length
    if (!allFilesCount) {
      return
    }
    this.ctx.totalFilesCount = allFilesCount
    console.log(`Total ${allFilesCount} files found, start analyzing...`)

    // Analyze
    await this.analyze(allFiles, fileHandlers)

    const end = new Date()
    this.secondsConsumed = (end - start) / 1000

    this.report()
  }

  async analyze(allFiles, fileHandlers) {
    let maxTries = 10
    let filesToProcess = allFiles
    while (1) { // eslint-disable-line no-constant-condition
      const tasks = filesToProcess.map(filePath => fileHandlers.analyzeFile(filePath))
      const restFiles = await Promise.all(tasks) // eslint-disable-line no-await-in-loop
      if (!restFiles.length) { // No more files to process
        break
      }
      filesToProcess = restFiles.filter(item => item)
      maxTries -= 1
      if (!maxTries) { // Max tries reached, exit
        break
      }
    }
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
