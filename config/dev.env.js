'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PATH: '"https://vue-course-api.hexschool.io"',
  CUSTOME_PATH: '"shopshop"'
})
