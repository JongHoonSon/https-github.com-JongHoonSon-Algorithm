const fs = require('fs');
let input = fs.readFileSync("./dev/stdin").toString().trim().split('\n');

const firstLineArray = input[0].split(' ');

const sisterNum = Number(firstLineArray[0]);
const suminPosition = Number(firstLineArray[1]);
const sisterPosition = input[1].split(' ').map(v=>+v);
let gcd;

if(sisterNum !== 1) {
  for(let i=0; i<sisterNum; i++) {
    if(gcd == undefined) {
      gcd = getGCD(Math.abs(sisterPosition[i] - suminPosition), Math.abs(sisterPosition[i+1] - suminPosition));
    } else {
      gcd = getGCD(gcd, Math.abs(sisterPosition[i] - suminPosition));
    }
  }
} else {
  gcd = Math.abs(sisterPosition[0] - suminPosition);
}
console.log(gcd);

function getGCD(a, b) {
  let temp;
  while(b != 0) {
    temp = a%b;
    a = b;
    b = temp;
  }
  return a;
}