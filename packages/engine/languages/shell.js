/**
 * Shell program language
 *
 */

const ShellScript = {
  id: 'ShellScript',
  name: 'Shell',
  ext: '.sh',

  lineCommentRegexp: /^\s*?#/, // -> Single line comment: # xxxxx
  blockCommentStartRegexp: null,
  blockCommentEndRegexp: null,
}

module.exports = ShellScript
