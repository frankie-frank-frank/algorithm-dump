// MAIN FUNCTION 
function main(inputArray) {
    let maxNumber = -Infinity; // First issue is assuming 0 is the max possible value when there could be an input array of all negatives
    for(let number of inputArray) { // Second, a for-of loop is best for this iteration
        if(number > maxNumber) maxNumber = number; // Third, you want to reassign the maxNumber when you find a larger number, not smaller. 
    }
    return maxNumber
}

// TEST:
const randomNumbers = [];

for (let i = 0; i < 1000; i++) {
    randomNumbers.push(Math.floor(Math.random() * 10000));
}

console.log(main(randomNumbers))