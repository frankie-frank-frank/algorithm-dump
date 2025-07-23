import * as fs from 'fs';

function compareAndReplace(str1, str2) {
    let result = '';
    let i = 0, j = 0;

    while (i < str1.length && j < str2.length) {
        if (str1[i] === str2[j]) {
            result += str1[i];
            i++;
            j++;
        } else {
            // If the characters don't match, skip over the differing segment
            let segment1 = '', segment2 = '';

            while (i < str1.length && j < str2.length && str1[i] !== str2[j]) {
                segment1 += str1[i];
                segment2 += str2[j];
                i++;
                j++;
            }
        }
    }

    // Handle remaining characters if any string is longer
    // if (i < str1.length) {
    //     result += str1.slice(i);
    // } else if (j < str2.length) {
    //     result += str2.slice(j);
    // }

    return result;
}

function testFn(str1, str2) {    
    const answer = compareAndReplace(str1, str2);
    console.log(answer.length, str1.length, str2.length, isNaN(answer.length/str1.length) ? 0 : answer.length/str1.length)
}

const string0 = JSON.stringify(fs.readFileSync("temp0.txt", {encoding: "utf-8"})).replace(/\\/g, '').slice(0, 8000);
const string1 = JSON.stringify(fs.readFileSync("temp1.txt", {encoding: "utf-8"})).replace(/\\/g, '').slice(0, 6000);

testFn(string0, string1)
testFn(string0.slice(0, 200), string1)
testFn("sss", string1)
testFn("", string1)