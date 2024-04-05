import { execSync } from 'child_process';

export function WgetCapture(url) {
  console.log('hey')
  const command = `wget --adjust-extension --span-hosts --convert-links --backup-converted --page-requisites -nd -P assets-22 ${url}`;
  const output = execSync(command).toString();
  console.log('output array: ', output)
}

WgetCapture("https://google.com");