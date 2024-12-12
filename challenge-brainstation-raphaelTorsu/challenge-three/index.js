/*
Operations & Comparisons
Step 1
Create two variables called "num1" and "num2". Assign each variable a different numerical value between 1 and 15.
*/
const num1 = 10
const num2 = 12

/*
Step 2
Using the variables above, add these variables together and multiply by 3. 
Assign the expression to a variable called "result" and console.log its value. 
*/
const result = (num1 + num2) * 3
console.log(result)

/*
Step 3
Using the result variable, write an if/else statement comparing the result to the number 50.
If the result is larger than 50, console.log "Result is bigger". 
If it is smaller, console.log "Result is smaller"
*/
if(result > 50) {
    console.log("Result is bigger")
} else {
    console.log("Result is smaller")
}

/*
Arrays & Loops
Step 1
Create an empty array and assign it to a variable called "numberList".
*/
const numberList = []

/*
Step 2
Using a for loop, place the numbers from 0 to 5 into the "numberList" array.
console.log the numberList array.
*/
for(let i=0; i<6; i++) {
    numberList.push(i)
}
console.log(numberList)

/*
Step 3
Remove the last number in the array and console.log the array.
*/
numberList.pop()
console.log(numberList)