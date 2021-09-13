/**
 * Handle languages
 */

class Languages {
  constructor(languageModules) {
    this.languageModules = languageModules
    this.languagesMap = new Map()
    this.buildLanguagesMap()
  }

  buildLanguagesMap() {

  }

  /**
   * Register languagesMap to engine
   */
  register(engine) {

  }
}

module.exports = Languages
