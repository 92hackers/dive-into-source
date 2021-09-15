/**
 * New Feature: Count lines of code
 *
 * The source code of a file contains below three parts:
 *
 * 1. code
 * 2. comment
 * 3. blank lines
 *
 */

class ClocFeature {
  constructor() {
    this.name = 'ClocFeature'
    this.startTime = 0 // Count running time of current feature
    this.stats = new Map()
  }

  initLinesCountData() {
    return {
      filesCount: 0,
      blankLinesCount: 0,
      commentLinesCount: 0,
      codeLinesCount: 0,
    }
  }

  async run({ matchLanguage, content }) {
    const {
      name, blockCommentEndRegexp, blockCommentStartRegexp,
      lineCommentRegexp, shebangRegexp,
    } = matchLanguage

    if (!this.stats.has(name)) {
      this.stats.set(name, this.initLinesCountData())
    }
    const targetStats = this.stats.get(name)

    targetStats.filesCount += 1

    // TODO: Case: comments in string
    // TODO: Case: regexp mismatch

    const linesContent = content.split(matchLanguage.lineSeparator)
    let isInBlockComment = false
    linesContent.forEach((line) => {
      // Check if is empty string
      if (!line) {
        if (isInBlockComment) {
          targetStats.commentLinesCount += 1
          return
        }
        targetStats.blankLinesCount += 1
        return
      }
      /* Check single-line style of multi-line comment */
      /* Start part should not be the same as end part */
      if (blockCommentStartRegexp && blockCommentStartRegexp.test(line)
          && !isInBlockComment && blockCommentEndRegexp
          && blockCommentEndRegexp.test(line.replace(blockCommentStartRegexp, ''))) {
        targetStats.commentLinesCount += 1
        return
      }
      // Check if is shebang
      if (shebangRegexp && shebangRegexp.test(line)) {
        targetStats.commentLinesCount += 1
        return
      }
      // Check if reach end of block comment
      if (blockCommentEndRegexp && blockCommentEndRegexp.test(line) && isInBlockComment) {
        targetStats.commentLinesCount += 1
        isInBlockComment = false
        return
      }
      // Check if in block comment
      if (isInBlockComment) {
        targetStats.commentLinesCount += 1
        return
      }
      // Check if the start of block comment
      if (blockCommentStartRegexp && blockCommentStartRegexp.test(line) && !isInBlockComment) {
        targetStats.commentLinesCount += 1
        isInBlockComment = true
        return
      }
      // Check line comment
      if (lineCommentRegexp && lineCommentRegexp.test(line)) {
        targetStats.commentLinesCount += 1
        return
      }
      // Code line
      targetStats.codeLinesCount += 1
    })
  }
}

module.exports = ClocFeature
