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
    // The all files array will be split into groups specified by this number
    this.divideNumber = 1
    this.maxTries = 10
    this.ctx = {
      totalFilesCount: 0,
      ignoredFilesCount: 0,
      config,
      languagesMap: new Map(),
      features: [],
      analyzedFilesMap: new Map(), // Store analyzed files
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
    console.log(`Total ${allFilesCount} files found, start analyzing...`)
    this.ctx.totalFilesCount = allFilesCount

    let sliceCount = 0
    while (1) {
      // Filter out analyzed files
      const restFiles = this.divideNumber > 1
        ? allFiles.filter(filePath => !this.ctx.analyzedFilesMap.get(filePath))
        : allFiles
      const sliceSize = restFiles.length / this.divideNumber // One slice size of all slice groups

      try {
        while (1) {
          const slicedFiles = restFiles.slice(sliceSize * sliceCount, sliceSize * (sliceCount + 1))
          if (!slicedFiles.length) { // No more slice files to analyze
            break
          }

          // eslint-disable-next-line max-len, no-await-in-loop
          await Promise.all(slicedFiles.map(filePath => fileHandlers.analyzeFile(filePath, this.ctx)))
          sliceCount += 1
        }

        break // Normal exit
      } catch (err) {
        console.log(err)
        console.log('Try again')
        this.divideNumber += 1
        this.maxTries -= 1
        sliceCount = 0
      }

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
    // console.log(this.ctx.analyzedFilesMap)
    console.log(this.divideNumber)
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
      console.log('---------------- -----------------')
    })
  }
}

module.exports = Engine
