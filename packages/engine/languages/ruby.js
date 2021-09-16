/**
 * Ruby program language
 *
 */

const Ruby = {
  id: 'Ruby',
  name: 'Ruby',
  ext: ['.rb', '.rbw'],

  lineCommentRegexp: /^\s*?#/, // -> Single line comment #
  blockCommentStartRegexp: /^=begin/, // -> STart of multi-line comment part /*
  blockCommentEndRegexp: /=end/, // -> End of multi-line comment part  */
}

module.exports = Ruby
