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

const { formatNumber } = require('../../utils')

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

  jsonReport() {
    const statsDataPairsArray = Array.from(this.stats.entries())
    // Format of data pair: [language, linesCountDataObj]
    statsDataPairsArray.sort((data1, data2) => data2[1].codeLinesCount - data1[1].codeLinesCount)
    return statsDataPairsArray
  }

  _cliTableTpl(languageStats, totalStats) {
    const firstColumnWidth = 20
    const subColumnWidth = 15
    const wrapContentWithLines = (content) => `
--------------------------------------------------------------------------------
${content}
--------------------------------------------------------------------------------
`
    const languageColumn = 'Language'.padEnd(firstColumnWidth)
    const filesColumn = 'files'.padStart(subColumnWidth)
    const blankColumn = 'blank'.padStart(subColumnWidth)
    const commentColumn = 'comment'.padStart(subColumnWidth)
    const codeColumn = 'code'.padStart(subColumnWidth)
    const caption = languageColumn + filesColumn + blankColumn + commentColumn + codeColumn
    const header = wrapContentWithLines(caption)

    let body = ''
    languageStats.forEach(({
      language, filesCount, blankLinesCount,
      commentLinesCount, codeLinesCount,
    }) => {
      const line = language.padEnd(firstColumnWidth)
      + formatNumber(filesCount).padStart(subColumnWidth)
      + formatNumber(blankLinesCount).padStart(subColumnWidth)
      + formatNumber(commentLinesCount).padStart(subColumnWidth)
      + formatNumber(codeLinesCount).padStart(subColumnWidth)
      body += `${line}\n`
    })

    body = body.replace(/\n$/, '') // Remove last \n char

    const footerContent = 'Total'.padEnd(firstColumnWidth)
    + formatNumber(totalStats.files).padStart(subColumnWidth)
    + formatNumber(totalStats.blank).padStart(subColumnWidth)
    + formatNumber(totalStats.comment).padStart(subColumnWidth)
    + formatNumber(totalStats.code).padStart(subColumnWidth)
    const footer = wrapContentWithLines(footerContent)

    return header + body + footer
  }

  cliTableReport() {
    const stats = this.jsonReport()
    const { languageStats, totalStats } = stats.reduce((accum, stat) => {
      const statsData = stat[1]
      const {
        filesCount, blankLinesCount, commentLinesCount, codeLinesCount,
      } = statsData
      accum.languageStats.push({
        language: stat[0].padEnd(20),
        filesCount,
        blankLinesCount,
        commentLinesCount,
        codeLinesCount,
      })
      accum.totalStats.files += filesCount
      accum.totalStats.blank += blankLinesCount
      accum.totalStats.comment += commentLinesCount
      accum.totalStats.code += codeLinesCount
      return accum
    }, {
      languageStats: [],
      totalStats: {
        files: 0, blank: 0, comment: 0, code: 0,
      },
    })
    console.log(this._cliTableTpl(languageStats, totalStats))
  }

  /**
   * Report stats
   */
  report() {
    this.cliTableReport()
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
