"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var fs_1 = require("fs");
var path = require("path");
var allFiles = [];
var allWords = [];
var readFiles = function () {
    //get all file names
    var testFolder = "../files/";
    (0, fs_1.readdirSync)(testFolder).forEach(function (file) {
        /* TO GET FULL FILENAME WITH DIRECTORY
      const val = __dirname.split("\\").filter(item => {return item !== 'data-structures'}).join("\\")  + "\\" + 'files'
      console.log('val2 ' + val)
      */
        /* TO READ FILE PATHS IN BUFFER(not relevant).
     readFile(path.resolve(__dirname, '../files', file), function (err, data) {
       console.log(data)
       //TO SEE IN STRING:
       console.log(data.toString())
     })
      */
        allFiles.push(file);
    });
};
//search each line individually and store words in an array
// console.log("Reading from a file")
var searchFiles = function () {
    allFiles.forEach(function (file) {
        (0, fs_1.readFile)(path.resolve(__dirname
            .split("\\")
            .filter(function (item) {
            return item !== "data-structures";
        })
            .join("\\") +
            "\\" +
            "files", file), function (err, data) {
            if (err) {
                return console.error(err);
            }
            //remove trailing lines
            var splitData = data
                .toString()
                .split("\n")
                .map(function (item) {
                return item.replace(/(\r\n|\n|\r)/gm, "");
            })
                .filter(function (item) { return item !== ""; });
            // console.log("Data read : ");
            var allWordsInFile = [];
            splitData.forEach(function (item) {
                item.split(" ").forEach(function (item) {
                    console.log(item);
                    allWordsInFile.push(item);
                });
            });
            allWordsInFile.forEach(function (fileWord, index) {
                var matchWord = allWords.map(function (item) {
                    if (item.word === fileWord.toLowerCase())
                        return item;
                });
                if (matchWord.length > 0) {
                    // matchWord.info.forEach(g_wordInfo => {
                    //   if (g_wordInfo.filename === file.toLowerCase()){
                    //     g_wordInfo.location.push(index)
                    //   } else {
                    //     g_word.info.push({
                    //       filename: file,
                    //       location: [index]
                    //     })
                    //   }
                    // })
                    console.log(matchWord);
                }
                else {
                    allWords.push({
                        word: fileWord.toLowerCase(),
                        info: [{ filename: file.toLowerCase(), location: [index] }]
                    });
                    console.log(allWords);
                }
            });
        });
    });
};
//sort words in allWords array alphabetically with quicksort: immediately execute it
function QuickSort(Arr) {
    if (Arr.length <= 1) {
        return Arr;
    }
    var pivot = Arr[Arr.length - 1];
    var leftArr = [];
    var rightArr = [];
    for (var i = 0; i < Arr.length - 1; i++) {
        Arr[i] < pivot ? leftArr.push(Arr[i]) : rightArr.push(Arr[i]);
    }
    return __spreadArray(__spreadArray(__spreadArray([], QuickSort(leftArr), true), [pivot], false), QuickSort(rightArr), true);
}
function main() {
    readFiles();
    searchFiles();
    console.log(QuickSort(["a", "aa", "aa.txt", "bc.txt"]));
}
;
main();
