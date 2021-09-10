/**
 * The engine of dive-into-source
 *
 */

const fileHandlers = require('./file')

async function main(dirPath) {
  const allFiles = await fileHandlers.readDirs(dirPath)
  // const res = await fileHandlers.readFiles(path)
  // console.log(res)
  Promise.all(allFiles.map(filePath => fileHandlers.readFiles(filePath)))
}

module.exports = main
