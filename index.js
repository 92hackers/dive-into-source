/**
 * Dive into source
 *
 */

const { program } = require('commander')

program.version('0.1.0')
  .option('-d, --debug', 'output extra debugging')
  .option('-h, --help', 'show this help info')
  .option('-c, --config-dir <config-dir-path>', 'specify custom config dir')
  .option('--generate-data-only')

program.parse(process.argv)
