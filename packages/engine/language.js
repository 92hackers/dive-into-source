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
      // multi-extensions could point to same kind of file type
      const mergedLanguage = { ...Default, ...languageModule }
      const fileExtensions = languageModule.ext
      if (typeof fileExtensions === 'string') {
        this.languagesMap.set(fileExtensions, mergedLanguage)
      } else if (Array.isArray(fileExtensions)) {
        fileExtensions.forEach(ext => this.languagesMap.set(ext, mergedLanguage))
      }
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
