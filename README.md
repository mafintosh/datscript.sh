# datscript.sh

Compile datscript to bash

```
npm install datscript.sh
```

## Usage

``` js
var ds = require('datscript.sh')

var bash = ds(
  'run echo hello world\n'+
  'pipe\n'+
  '  echo piping\n'+
  '  cat'
)

console.log(bash)
```

## Command line usage

```
npm install -g datscript.sh
datscript.sh test.ds | sh
```

Running the above will convert the datscript test.sh to bash and execute it

## License

MIT
