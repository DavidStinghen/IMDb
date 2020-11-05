const express = require('express')

require('./bootstrap')

class App {
  constructor () {
    this.server = express()
  }
}

module.exports = new App().server
