#!/usr/bin/env node

'use strict'

import argparse from 'argparse'
import assert from 'assert'
import fs from 'fs'
import yaml from 'js-yaml'

import {makeBib} from './bib.js'

/**
 * Main driver.
 */
const main = () => {
  const config = getConfiguration()
  const data = yaml.safeLoad(fs.readFileSync(config.input))
  const text = makeBib(data)
  fs.writeFileSync(config.output, text)
}

/**
 * Build program configuration.
 * @returns {Object} Program configuration.
 */
const getConfiguration = () => {
  const parser = new argparse.ArgumentParser()
  parser.add_argument('--input')
  parser.add_argument('--output')

  const config = parser.parse_args()

  assert(config.input,
         `Need input file`)
  assert(config.output,
         `Need output file`)
  return config
}

// Run program.
main()
