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
    this.features = Object.values(this.featureModules).map(F => new F())
  }

  register(engine) {
    // eslint-disable-next-line no-param-reassign
    engine.ctx.features = this.features
  }
}

module.exports = Feature
