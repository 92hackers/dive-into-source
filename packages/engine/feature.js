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
    engine.ctx.features = this.features
  }
}

module.exports = Feature
