/**
 * Python language
 */

const Python = {
  id: 'Python',
  name: 'Python',
  ext: '.py',
  lineSeparator: '\n',

  lineCommentRegexp: /^\s*?#/, // -> Single line comment //
  blockCommentStartRegexp: /^\s*?[ru]?"""/, // -> STart of multi-line comment part: """, doc-string
  blockCommentEndRegexp: /"""\s*?$/, // -> End of multi-line comment part: """
}

module.exports = Python
