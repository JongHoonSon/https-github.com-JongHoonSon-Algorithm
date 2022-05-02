const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().split(" ");

const minNum = +input[0];
const maxNum = +input[1];
let isPrimeNumber = Array(maxNum + 1).fill(true);
isPrimeNumber[0] = isPrimeNumber[1] = false;

let sqrtMaxNum = Math.ceil(Math.sqrt(maxNum));

for (let i = 2; i <= sqrtMaxNum; i++) {
  if (isPrimeNumber[i]) {
    let m = 2;
    while (m * i <= maxNum) {
      isPrimeNumber[i * m] = false;
      m++;
    }
  }
}

let prime = [];

for (let i = minNum; i <= maxNum; i++) {
  if (isPrimeNumber[i]) {
    prime.push(i);
  }
}

console.log(prime.join("\n"));
