/**
 * YAML language
 */

const Yaml = {
  id: 'Yaml',
  name: 'YAML',
  ext: ['.yml', '.yaml'],

  lineCommentRegexp: /^\s*?#/, // -> Single line comment: # xxxxx
}

module.exports = Yaml
