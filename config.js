/**
 * Get configurations
 *
 */

// Built-in supported languages, placed in ./languages dir
//
//

// Load User custom downloaded languages, maybe from ~/.config/dive-into-source/languages/ dir
//
// Or you can specify custom config dir for dive-into-source at command-line
//

const config = {
  languages: ['./languages/'],
  engine: {
    port: 8888,
    address: 'localhost',
  },
  excludeDirs: ['.git'], // Or parse ignore dirs from .gitignore file
}

module.exports = config
