import fetch from 'node-fetch';
import * as https from 'https';
import { execSync } from "child_process";
import * as fs from 'fs';
import * as path from 'path';

async function main() {
    let cssEntry = {htmlFileLink: "", relativeLink: `asset-replace-for-2/assets/asset-2.css`}
    const inputArr = [
        "https://dudepruner.com/cdn/fonts/avenir_next_rounded/avenirnextrounded_n6.19150390dd803328b11894fb19904ee50bf0bf9e.woff?h1=ZHVkZXBydW5lci5jb20&h2=dXMuZHVkZXBydW5lci5jb20&h3=dWsuZHVkZXBydW5lci5jb20&h4=Y2EuZHVkZXBydW5lci5jb20&h5=ZHVkZS1wcnVuZXIuYWNjb3VudC5teXNob3BpZnkuY29t&h6=ZHVkZXBydW5lci5jb20uYXU&h7=ZHVkZXBydW5lci5jby51aw&h8=ZHVkZXBydW5lci5ldQ&h9=ZHVkZXBydW5lci5jYQ&hmac=49ddfa543452f7244ce652c93d546608d682625b3db4df37e128a3dcfbba89aa",
        "https://uschat4.contivio.com/chat2/CustomStyles/C67022335172F084B2ADD9D3ADCEC2216.css"
    ]
    // for(let i = 0; i < inputArr.length; i++) {
    //     const item = inputArr[i]

    //     const command = `wget --adjust-extension --span-hosts --convert-links --backup-converted --page-requisites -nd -P asset-store/${i} ${item}`;
    //     try {
    //         execSync(command);
    //     } catch (e) {
    //         console.log("Error on downloading an asset");
    //         const fetchCssResponse = await fetch(item);
    //         const status = fetchCssResponse.status;
    //         if(status === 200) {
    //             const cssText = await fetchCssResponse.text();
    //         }
    //     }
    // }
    const files = fs.readdirSync("asset-store/1");
    const cssFiles = files.filter(file => path.extname(file) === '.css');
    console.log("css files: ", path.join("asset-store/1", cssFiles[0]))
}

main()