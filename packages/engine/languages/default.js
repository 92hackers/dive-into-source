/**
 * Default definitions for languages
 */

const Default = {
  id: 'default',
  name: 'default',
  lineSeparator: '\n',
  shebangRegexp: /^\s*?#!.*/,

  lineCommentRegexp: /^\s*?\/\//, // -> Single line comment //
  blockCommentStartRegexp: /^\s*?\/\*/, // -> STart of multi-line comment part /*
  blockCommentEndRegexp: /\*\//, // -> End of multi-line comment part  */
}

module.exports = Default
