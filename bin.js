#!/usr/bin/env node

var ds = require('./')
var fs = require('fs')

console.log(ds(fs.readFileSync(process.argv[2])))