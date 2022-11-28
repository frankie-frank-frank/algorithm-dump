/* BAD SOLUTION */
/**
 * @param {string} s
 * @return {number}
 */
 var longestPalindrome = function(s) {
    if(s.length == 1){
        return 1;
    }
    let palindromeCount = 0;
    let maxNonEven = 1;
    function freq(nums) {
        return nums.reduce((acc, curr) => {
            acc[curr] = -~acc[curr];
            return acc;
        }, 
      {});
    }
    const freqCount = freq(s.split(""));
    for(const keyVal in freqCount){
        if(freqCount[keyVal] % 2 == 0){
            palindromeCount+=freqCount[keyVal]
        } else if(freqCount[keyVal] % 2 != 0){
            maxNonEven = Math.max(maxNonEven, freqCount[keyVal])
        }
    }
    if(palindromeCount == 0 && Object.keys(freqCount).length == 1){
        for(const keyVal in freqCount){
            palindromeCount+=freqCount[keyVal]
        }
    }
    if(s.length > palindromeCount){
        palindromeCount+=maxNonEven;
    }
  return palindromeCount  
};

/* GOOD SOLUTION */
/**
 * @param {string} s
 * @return {number}
 */

 var longestPalindrome = function(s) {
    let longest = 0;
    let keys = {};
  
      for (const char of s) {
          keys[char] = (keys[char] || 0) + 1;
          if (keys[char] % 2 == 0) longest += 2;
      }
      return s.length > longest ? longest + 1 : longest;
  };
console.log(longestPalindrome("aaabaaaa")) //aaaaaaa
console.log(longestPalindrome("bananas")) //anana
console.log(longestPalindrome("abccccdd")) //ccdbdcc

// get maximum non-even count