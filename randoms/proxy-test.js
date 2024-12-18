import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';

(async () => {
const proxyHost = "45.77.153.183"
const proxyPort = "10284"
const proxyUrl = `https://${proxyHost}:${proxyPort}`;
const targetUrl = 'https://google.com';

const proxyAgent = new HttpsProxyAgent(proxyUrl);
const response = await fetch(targetUrl, { agent: proxyAgent });
const html = response.status;
console.log(html);

})();