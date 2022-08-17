const fs = require('fs')

class Main {
    constructor(file) {
        this.file = file;
        this.data = 'none'
    }

    readFileFunc() {
        const allFileContents = fs.readFileSync(this.file, 'utf-8')
        let indexCount = 0
        const finalArray = []
        allFileContents.split(/\r?\n/).forEach(line => {
            if(indexCount > 0){
                let obj = {}
                obj[`Case #${indexCount}: `] = this.createGeneratorOutput(parseInt(line))
                finalArray.push(obj)
            }
            indexCount++
        })
        return finalArray
    }

    createGeneratorOutput(num) {
        if (num === 0) return
        if (!num) return
        const finalArray = []
        let initialNum = 1
        while (initialNum < num) {
            let currSum = initialNum
            let currNum = initialNum
            while (currSum <= num) {
                currNum++
                if (currSum === num) {
                    finalArray.push(initialNum)
                }
                currSum += currNum
            }
            initialNum++
        }
        finalArray.push(num)
        return finalArray
    }
}

const newFile = new Main('./sample-input.txt')
console.log(newFile.readFileFunc())