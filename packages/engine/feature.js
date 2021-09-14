/**
 * Process feature modules
 */

class Feature {
  constructor(featureModules) {
    this.featureModules = featureModules
    this.features = []
    this.buildFeatures()
  }

  buildFeatures() {
    this.features = Object.values(this.featureModules)
  }

  register(engine) {
    engine.ctx.features = this.features // eslint-disable-line no-param-reassign
  }
}

module.exports = Feature
