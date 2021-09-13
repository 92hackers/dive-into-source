/**
 * Javascript program language plugin for dive-into-source
 */

const Javascript = {
  id: 'Javascript',
  name: 'javascript',
  ext: '.js',
  commentRegexp: [/\\*.*?\*\//, /\/\//], //  /* comment */ and  // comment
  lineSeparator: /\\n/,
}

module.exports = Javascript
