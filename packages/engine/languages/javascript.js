/**
 * Javascript program language plugin for dive-into-source
 */

const Javascript = {
  id: 'Javascript',
  name: 'Javascript',
  ext: '.js',
  lineCommentRegexp: /^\/\//,
  blockCommentStartRegexp: /^\/\*/,
  blockCommentEndRegexp: /\*\/$/, //  /* comment */ and  // comment
  lineSeparator: '\n',
}

module.exports = Javascript
