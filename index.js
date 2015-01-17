var hackfile = require('hackfile')
var fs = require('fs')

module.exports = function(src) {
  var tree = hackfile(src.toString().replace(/(\s+)run (.+)\n/g, '$1run\n$1  $2\n').replace(/#[^\n]+/g, '')) // haxx
  var tick = 1

  var backgrounds = []
  var fns = []

  var visit = function(line) {
    var cmd = line[0]
    var params = line[1]

    switch (cmd) {
      case 'map':
      return params.join('\n')+'\n'

      case 'reduce':
      return params.join('\n')+'\n'

      case 'run':
      return params.join('\n')+'\n'

      case 'pipe':
      return params.join(' | ')+'\n'

      case 'background':
      var str = ''
      var pids = []
      for (var i = 0; i < params.length; i++) {
        var p = params[i]
        var pid = 'GASKET_PID'+(tick++)
        pids.push(pid)
        str += p+' &\n'+pid+'=$!\n'
      }
      for (var i = 0; i < pids.length; i++) {
        backgrounds.push('kill $'+pids[i]+'\nwait $'+pids[i]+'\n')
      }
      return str

      case 'fork':
      var str = ''
      var pids = []
      for (var i = 0; i < params.length; i++) {
        var p = params[i]
        var pid = 'GASKET_PID'+(tick++)
        pids.push(pid)
        str += p+' &\n'+pid+'=$!\n'
      }
      for (var i = 0; i < pids.length; i++) {
        str += 'wait $'+pids[i]+'\n'
      }
      return str
    }

    fns.push(cmd+'() {\n'+params.map(visit).join('')+'}\n')
    return ''
  }

  var output = tree.map(visit).join('')
  return '#!/bin/bash\n'+fns.join('')+'\n'+output+'\n'+backgrounds.join('')
}
