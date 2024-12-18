function getMaxMatchingSequence(selector1, selector2) {
    let break1 = selector1.split(" > ");
    let break2 = selector2.split(" > ");
    
    let iterativeResponse = false
    let iterativeValue = []
    while(!iterativeResponse) {
        iterativeValue = iterativeStep(break1, break2)
        if(iterativeValue.length ===0) {
            break;
        } else {
            iterativeResponse = true
        }
    }
    return iterativeValue;
}

function iterativeStep(selectorArray1, selectorArray2) {
    let indexOnFirst = 0
    let indexOnSecond = 0
    let finalArr = []
    let initial = true

    let iterableArray = selectorArray1
    while(indexOnSecond < selectorArray2.length) {
        if(!initial) { iterableArray = selectorArray1.slice(selectorArray1.indexOf(selectorArray2[indexOnSecond]))}
        else { initial = false; }
        for(let i = 0; i < iterableArray.length; i++) {
            const element = iterableArray[i]
            if(element === selectorArray2[indexOnSecond] && (i - indexOnFirst) < 3) {
                indexOnFirst = i
                indexOnSecond++
                finalArr.push(element)
            }
        }
        indexOnSecond++;
    }
    return finalArr
}

const selector1 = "html > body > div:nth-child(6)";
const selector2 = "html > body";

const cleanSelector = (input) => {
    const elementsCount = input.length;
    const comparisonCount = selector1.split(" > ").length;
    console.log(elementsCount, comparisonCount)
    return input.length === 0 ? false : parseFloat((elementsCount / comparisonCount).toPrecision(4)) > 0.8
}
const cleanedSelector = cleanSelector(getMaxMatchingSequence(selector1, selector2));
console.log(cleanedSelector)