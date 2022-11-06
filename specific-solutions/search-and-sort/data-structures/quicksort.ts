import { appendFileSync, readFile, readdirSync, readFileSync } from "fs";
import path = require("path");
//types
type wordInfo = {
  filename: string;
  location: number[];
};
type wordPrimitive = {
  word: string;
  info: wordInfo[];
};

const allFiles: string[] = [];
const allWords: wordPrimitive[] = [];
const readFiles = () => {
  //get all file names
  const testFolder = "../files/";
  readdirSync(testFolder).forEach((file) => {
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
const searchFiles = () => {
allFiles.forEach((file: string): void => {
  readFile(
    path.resolve(
      __dirname
        .split("\\")
        .filter((item) => {
          return item !== "data-structures";
        })
        .join("\\") +
        "\\" +
        "files",
      file
    ),
    function (err, data) {
      if (err) {
        return console.error(err);
      }
      //remove trailing lines
      const splitData = data
        .toString()
        .split("\n")
        .map((item) => {
          return item.replace(/(\r\n|\n|\r)/gm, "");
        })
        .filter((item) => item !== "");
      // console.log("Data read : ");
      const allWordsInFile: string[] = [];
      splitData.forEach((item) => {
        item.split(" ").forEach((item) => {
          allWordsInFile.push(item);
        });
      });
      allWordsInFile.forEach((fileWord, index) => {
        const matchWord = allWords.map((item) => {
          if (item.word === fileWord.toLowerCase()) return item;
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
        } else {
          allWords.push({
            word: fileWord.toLowerCase(),
            info: [{ filename: file.toLowerCase(), location: [index] }],
          });
          console.log(allWords);
        }
      });
    }
  );
})};



//sort words in allWords array alphabetically with quicksort: immediately execute it
function QuickSort(Arr: any) {
    if (Arr.length <= 1) {
      return Arr;
    }

    const pivot = Arr[Arr.length - 1];
    const leftArr = [];
    const rightArr = [];

    for (let i = 0; i < Arr.length - 1; i++) {
      Arr[i] < pivot ? leftArr.push(Arr[i]) : rightArr.push(Arr[i]);
    }

    return [...QuickSort(leftArr), pivot, ...QuickSort(rightArr)];
  }

function main() {
  readFiles()
  searchFiles()
  console.log(QuickSort(["a", "aa", "aa.txt", "bc.txt"]))
};
main()