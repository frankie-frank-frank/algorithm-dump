import process from 'process'
import util from 'util'

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
        for (const element of keys) {
            let k = element;
            this[k] = this[k].bind(this);
        }
    }
    log() {
        const argArray = [...arguments]
        argArray.forEach(item => {
            const val = item + " " + typeof (item) + "\n"
            this._stdout.write(val)
        })
    }
}

const newConsole = new Console(process.stdout, process.stderr)
newConsole.log("hi", "you", 3)

