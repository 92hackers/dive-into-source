/**
 *
 * C program language plugin for dive-into-source
 *
 */

const C = {
  id: 'c',
  name: 'C',
  ext: '.c',
  commentRegexp: [/\\*.*?\*\//, /\/\//], //  /* comment */ and  // comment
  lineSeparator: /\\n/,
}

module.exports = C
