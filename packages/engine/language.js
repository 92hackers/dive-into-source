/**
 * Handle languages
 */

class Language {
  constructor(languageModules) {
    this.languageModules = languageModules
    this.languagesMap = new Map()
    this.buildLanguagesMap()
  }

  buildLanguagesMap() {
    const { Default } = this.languageModules
    Object.keys(this.languageModules).forEach((language) => {
      const languageModule = this.languageModules[language]
      if (languageModule.name === 'default') {
        return
      }
      // Select language file extension as map key
      this.languagesMap.set(languageModule.ext, { ...Default, ...languageModule })
    })
  }

  /**
   * Register languagesMap to engine
   */
  register(engine) {
    engine.ctx.languagesMap = this.languagesMap
  }
}

module.exports = Language
