// import { Console } from 'console'
// import fs from 'fs'
// import process from 'process'
// import { Stream } from 'stream'
// const console = new Console({stdout: process.stdout.write(...args), stderr: process.stderr})

// /*
//     test cases 1:
// */
// console.log("hey")

/*
    alternatives to console.log
*/

import process from 'process'
import util from 'util'
// console.log = function (d) {
//     process.stdout.write(d + " \"" + typeof(d) + "\"" + '\n' );
//   };

// /*
//     test cases:
// */
// console.log("hey", 33) //hey string
// console.log(22) //22 number
// console.log(true) //true boolean

//last test case: console.log("hey", 22)

class Console {
    constructor(stdout, stderr) {
        if (!(this instanceof Console)) {
            return new Console(stdout, stderr);
        }
        if (!stdout || !util.isFunction(stdout.write)) {
            throw new TypeError('Console expects a writable stream instance');
        }
        if (!stderr) {
            stderr = stdout;
        }
        let prop = {
            writable: true,
            enumerable: false,
            configurable: true
        };
        prop.value = stdout;
        Object.defineProperty(this, '_stdout', prop);
        prop.value = stderr;
        Object.defineProperty(this, '_stderr', prop);
        prop.value = Object.create(null);
        Object.defineProperty(this, '_times', prop);

        // bind the prototype functions to this Console instance
        let keys = Object.keys(Console.prototype);
        for (let v = 0; v < keys.length; v++) {
            let k = keys[v];
            this[k] = this[k].bind(this);
        }
    }
    log() {
        this._stdout.write(util.format.apply(this, arguments) + '\n');
    }
}
  
const newConsole = new Console(process.stdout, process.stderr)
newConsole.log("hi", "you")