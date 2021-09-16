/**
 * Perl program language
 *
 */

const Perl = {
  id: 'Perl',
  name: 'Perl',
  ext: ['.pl', '.pm', '.t', '.pod', '.plx'],

  lineCommentRegexp: /^\s*?#/, // -> Single line comment: #

  // POD language is used to write multi-line comments in Perl
  blockCommentStartRegexp: /^=.+?$/, // -> STart of multi-line comment part: =head1
  blockCommentEndRegexp: /^=.+?$/, // -> End of multi-line comment part: =cut
}

module.exports = Perl
