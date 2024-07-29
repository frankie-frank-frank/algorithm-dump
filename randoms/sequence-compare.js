function takeTwoStrings(inputA, inputB) {
    const { shorter, longer } = inputA.length > inputB.length ? {longer: inputA, shorter: inputB} : {longer: inputB, shorter: inputA};

    let sequenceMatch = 0;
    let shorterIndex = 0
    for(let char of longer) {
        if(char === shorter[shorterIndex]) { sequenceMatch++; shorterIndex++}
    }

    return ({sequenceMatch, s: shorter.length, l: longer.length, percentage: sequenceMatch / inputA.length})
}

console.log(takeTwoStrings("Hello Favour", "Hello Favour"))