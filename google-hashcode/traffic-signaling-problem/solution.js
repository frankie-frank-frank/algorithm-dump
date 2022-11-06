import { appendFileSync, readFile } from "fs";


/* WRITE TO FILE */
//console.log(" Writing into an file ");
// fs.writeFile(
//   "outfile.txt",
//   "Let's write a few sentences in the file",
//   function (err) {
//     if (err) {
//       return console.error(err);
//     }
  
//     // If no error the remaining code executes
//     console.log(" Finished writing ");
//     console.log("Reading the data that's written");
  
//     // Reading the file
//     fs.readFile("outfile.txt", function (err, data) {
//       if (err) {
//         return console.error(err);
//       }
//       console.log("Data read : " + data.toString());
        
//     });
//   }
// );


/* APPEND TO FILE */
console.log("Appending to file");
[...Array(10).keys()].forEach(item => {
    appendFileSync('outfile.txt', `${item} data to append` + "\n", function (err) {
        if (err) throw err;
        console.log('Saved!');
      })
}
)

/*READ BY LINE FROM FILE */
console.log("Reading from a file")
readFile("outfile.txt", function (err, data) {
    if (err) {
      return console.error(err);
    }
    //remove trailing lines
    const splitData = data.toString().split("\n").filter(item => item !== "")
    console.log("Data read : ");    
    console.log(splitData)
    });

// let songs = []

// function addSong(){
//   const name = document.getElementById("#button").innerText
//   const id = songs.length + 1
//   const newSong = {
//     name,
//     id
//   }
//   songs.push(newSong)
// }

// function removeSong(song){
//   const filteredSongs = songs.filter(item => {
//     return item.name !== song
//   })
//   songs = filteredSongs
// }