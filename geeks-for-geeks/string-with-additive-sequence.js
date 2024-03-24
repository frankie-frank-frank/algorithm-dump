// PREMISS: String with additive sequence was proposed by geeks-for-geeks

function main() {
    const inputString = '1235813'
    let valid = interrimCalc(0, inputString)
    while(valid.success = true) {
        console.log(valid);
        valid = interrimCalc(valid.nextStart, inputString)
    }
    // TODO 2: GET THE FIRST SUCCESS
    return valid.success
}

function interrimCalc(firstIndex, string) {
    for(let i = firstIndex+1; i < string.length; i++) {
        const firstNum = parseInt(string.slice(firstIndex, i))
        let incrementer = 0
        while(firstIndex + 1+incrementer < string.length) {
            incrementer+=1
            const secondNum = parseInt(string.slice(i, i+incrementer))
            const sumLength = String(firstNum+secondNum)
            const possibleCorrectSum = parseInt(string.slice(i, i + sumLength.length))
            // TODO 1: correct sum is inaccurate
            console.log(firstIndex, firstNum, secondNum, i, possibleCorrectSum)
            if(firstNum + secondNum === possibleCorrectSum) {
                return {nextStart: i + String(secondNum).length, success: true}
            }
        }
    }
    return false
}
export default function SWASTest() {
    return main()
}

// if you get a truth value that goes to the end, return true