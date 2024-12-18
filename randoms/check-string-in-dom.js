// import { execSync } from "child_process";
// import * as path from "path";
// import * as fs from "fs";


// function checkJsFile(url, currFileName) {
//     execSync(`httrack --get ${url}`)
//     const files = fs.readdirSync(".").filter(file => path.extname(file).includes('.html'));
//     if(fs.readFileSync( files[0]).toString().includes("heatmap")) console.log("true");
//     else console.log("false")
//     /**
//      * WARNING!! The script below is for deleting all files in the current directory
//     */
//    // execSync(`find ./ -type f -not -name ${currFileName} -delete`);
// }

// checkJsFile("https://thejellybee.com", "index.js")
// checkJsFile("https://timelines.ai/salesforce-and-whatsapp-integration-for-multiple-numbers/", "index.js")