#! /usr/bin/env node

/**
 * Dive into source
 *
 */

const commander = require('commander')
const defaultConfig = require('./config.js')
const mainFunc = require('./packages/engine/index.js')

const program = new commander.Command()

program.version('0.1.0')
  .option('-d, --debug', 'output extra debugging')
  .option('-h, --help', 'show this help info')
  .option('-c, --config-dir <config-dir-path>',
    'specify custom config dir, default at current dir', '.')
  .option('--build-data-only', 'Build data only')
  .option('--print-config', 'Print configs acquired by div-into-source')
  .option('-s --signal <stop, quit, reload>', 'send signal to a master process: stop, quit, reload')
  .option('-p --port', 'Specify a custom port for engine to listen on')
  .option('-a --address', 'Specify a custom network address, Default is localhost')

// Add commands later
// program
//   .command('log', 'Show engine running log')

program.parse(process.argv)

const options = program.opts()

const { configDir } = options

mainFunc(configDir)
