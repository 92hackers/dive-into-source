#! /usr/bin/env node

/**
 * Dive into source
 *
 */

const parseArgs = require('minimist')
const defaultConfig = require('./config.js')
const Engine = require('./packages/engine/index.js')
// const validateCliOptions = require('./cli/validate-options.js')
const packageJson = require('./package.json')

const argvMap = parseArgs(process.argv.slice(2))

const defaultRepoPath = './' // Default, We analyze files of curent dir
const { version } = packageJson

const printHelpMessage = () => `
Usage: divesource [OPTIONS] repo-path

A tool to help you analyze youre code base.
Visit: https://github.com/92hackers/dive-into-source to get more details.

Options:
  -c, --config        Specify custom config directory, default: ~/.divesource/
      --print-config  Print configuration information that will be used by divesource
  -d, --debug         Output extra debug information
  -s, --signal <stop, quit, reload>    Send signal to a master process: stop, quit, reload
  -p, --port           Specify a custom port for divesource engine to listening on
  -a, --address      Specify a custom network address, Default is localhost
  -v, --version       Print version information and quit
  -h, --help          Print help messages
`

function exit() {
  process.exit(0)
}

function processArgs(argv) {
  let cliOptions = Object.create(null) // Pure map

  const repoPath = argv._[0] || defaultRepoPath
  cliOptions = { repoPath }

  if (argv.h || argv.help) { // show help page and exit
    console.log(printHelpMessage())
    exit()
  }

  if (argv.v || argv.version) { // show version and exit
    console.log(version)
    exit()
  }

  if (argv.c || argv.config) {
    cliOptions.configDir = argv.c || argv.config
  }

  if (argv.d || argv.debug) {
    cliOptions.debug = true
  }

  if (argv.s || argv.signal) {
    cliOptions.signal = argv.s || argv.signal
  }

  if (argv.p || argv.port) {
    cliOptions.port = argv.p || argv.port
  }

  if (argv.a || argv.address) {
    cliOptions.address = argv.a || argv.address
  }

  return cliOptions
}

const cliOptions = processArgs(argvMap)

// TODO: Validate cli options
//
// if (validateCliOptions(cliOptions) > 0) {
//   process.exit(1)
// }

const finalConfig = Object.seal({ ...defaultConfig, ...cliOptions })
const engine = Object.seal(new Engine(finalConfig))

engine.run()
