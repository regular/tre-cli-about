#!/usr/bin/env node
const {parse, join, resolve, dirname} = require('path')
const ssbClient = require('ssb-zero-conf-client')
const ssbKeys = require('ssb-keys')
const debug = require('debug')('tre-cli-about:bin')
const run = require('.')

const argv = require('minimist')(process.argv.slice(2))
debug('parsed command line arguments: %O', argv)

if (argv._.length<1 || argv.help) {
  const bin = argv['run-by-tre-cli'] ? 'tre about' : 'tre-cli-about'
  if (argv.help) {
    console.error(require('./help')(bin))
    process.exit(0)
  } else {
    console.error('Missing argument\nUsage: ' + require('./usage')(bin))
    process.exit(1)
  }
}

const conf = require('rc')('tre')
const path = conf.config
debug('read .trerc from %s: %O', path, conf)
if (!path) {
  console.error('.trerc not found')
  process.exit(1)
}

const keys = ssbKeys.loadSync(join(path, '../.tre/secret'))

ssbClient(conf.caps.shs, keys, (err, ssb) => {
  function bail(err) {
    if (err) {
      console.error(err.message)
      if (ssb) ssb.close(()=>process.exit(1))
      else process.exit(1)
    }
  }
  bail(err)

  run(ssb, argv, err => {
    bail(err)
    ssb.close(()=>{
      process.exit(0)
    })
  })
})
