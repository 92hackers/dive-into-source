/**
 * The engine of dive-into-source
 *
 */

const fileHandlers = require('./file')

const path = './sum.js'

async function main() {
  const res = await fileHandlers.readFiles(path)
  console.log(res)
}

main()
