/**
 * Vue language
 */

const Vue = {
  id: 'Vue',
  name: 'Vue',
  ext: '.vue',

  lineCommentRegexp: /^\s*?\/\//, // -> Single line comment //
  blockCommentStartRegexp: /^\s*?\/\*|^\s*?<!--/, // -> STart of multi-line comment part /* or <!--
  blockCommentEndRegexp: /\*\/|-->/, // -> End of multi-line comment part  */
}

module.exports = Vue
