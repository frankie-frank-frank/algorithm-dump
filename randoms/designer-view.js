//keep a var for max initialized
//keep a var for length of the string
//keep a var for length of the 
//charCodeAt(i)
//pop the first value of the string,

function designerView(arr, str){
    let max = 0;
    console.log(str.length)
    for(let i=0; i<str.length; i++){
        if(testIfAlphabet(str.charAt(i))){
            let characterLocation = str.charCodeAt(i) - 97
            let arrayValue = arr[characterLocation]
            if(arrayValue > max){
                max = arrayValue
            }
            letterCount++;
        }
    }
    return max*letterCount;
}

function testIfAlphabet(char){
    return char.toLowerCase() !== char.toUpperCase();
}

console.log(designerView([1,3,1,3,1,4,1,3,2,5,5,5,5,1,1,5,5,1,5,2,5,5,5,5,5,5], ' torn'))