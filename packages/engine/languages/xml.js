/**
 * XML language
 */

const Xml = {
  id: 'Xml',
  name: 'XML',
  ext: '.xml',

  lineCommentRegexp: null,
  blockCommentStartRegexp: /^\s*?<!--/, // -> STart of multi-line comment part <!--
  blockCommentEndRegexp: /-->/, // -> End of multi-line comment part -->
}

module.exports = Xml
