const fs = require("fs");
let input = fs
  .readFileSync("./dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => +v);
const testCaseNum = input.shift();
const answer = [];

let primeArray = new Array(1000001).fill(true);
primeArray[1] = false;
for (let i = 2; i <= 1000001; i++) {
  if (primeArray[i]) {
    for (let j = i * i; j <= 1000001; j += i) {
      primeArray[j] = false;
    }
  }
}
let result = [];

input.map((x) => {
  let tmp = 0;
  let y = Math.ceil(x / 2);
  if (x === 4) tmp = 1;
  else {
    for (let i = 3; i <= y; i += 2) {
      if (primeArray[i] && primeArray[x - i]) {
        tmp++;
      }
    }
  }
  result.push(tmp);
});

console.log(result.join("\n"));
