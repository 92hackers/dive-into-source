/**
 * Static program analysis
 *
 * 1. Collect program notations: dataStructure declaration, data reference,
 * function call, function declaration
 *
 */

class StaticAnalysisFeature {
  constructor() {
    this.name = 'StaticAnalysisFeature'
    this.startTime = 0 // Count running time of current feature

    this.functionsDeclared = []
    this.functionsCalled = []
    this.dataDeclared = []
    this.dataReferenced = []
    this.dependentModules = []
    this.moduleExports = []

    // Store final result
    this.stats = new Map()
  }

  async run({ matchLanguage, content }) {
    // TODO: module path required
    console.log('StaticAnalysisFeature')
    // console.log(content)
  }

  aggregate() { // Aggregate all collected data

  }

  report() {
    console.log('StaticAnalysisFeature report')
  }
}

module.exports = StaticAnalysisFeature
