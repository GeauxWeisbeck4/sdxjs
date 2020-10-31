const assert = require('assert')
const fs = require('fs')
const yaml = require('js-yaml')

const SkeletonBuilder = require('./skeleton-builder')

class ConfigLoader extends SkeletonBuilder {
  loadConfig () {
    this.config = yaml.safeLoad(fs.readFileSync(this.configFile, 'utf-8'))
    assert(Array.isArray(this.config),
      'Configuration must be array')
    this.config.forEach(rule => {
      assert(('target' in rule) && (typeof rule.target === 'string'),
        `Rule ${JSON.stringify(rule)} does not string as 'target'`)
      assert(('depends' in rule) &&
        Array.isArray(rule.depends) &&
        rule.depends.every(dep => (typeof dep === 'string')),
        `Bad 'depends' for rule ${JSON.stringify(rule)}`)
      assert(('recipes' in rule) &&
        Array.isArray(rule.recipes) &&
        rule.recipes.every(recipe => (typeof recipe === 'string')),
        `Bad 'recipes' for rule ${JSON.stringify(rule)}`)
    })
  }
}

module.exports = ConfigLoader
