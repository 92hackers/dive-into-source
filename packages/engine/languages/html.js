/**
 * HTML language
 */

const Html = {
  id: 'HTML',
  name: 'HTML',
  ext: '.html',
  lineSeparator: '\n',

  lineCommentRegexp: null,
  blockCommentStartRegexp: /^\s*?<!--/, // -> STart of multi-line comment part <!--
  blockCommentEndRegexp: /-->/, // -> End of multi-line comment part -->
}

module.exports = Html
