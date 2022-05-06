const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString();

input = Number(input);

// console.log(input);

const mod = BigInt(1000000000);

let D = new Array(12).fill(0);

for (let i = 0; i < 12; i++) {
  D[i] = new Array(101).fill(0);
}

for (let i = 2; i < 11; i++) {
  D[i][0] = BigInt(1);
}

// for(let i=0; i<12; i++) {
//   console.log(i+ " : " + D[i] + "\n");
// }
// console.log(D[2][1]);

for (let j = 1; j <= input; j++) {
  for (let i = 1; i < 11; i++) {
    D[i][j] = BigInt(D[i - 1][j - 1]) + BigInt(D[i + 1][j - 1]);
  }
}

// console.log('------------------------------');

// for(let i=0; i<12; i++) {
//   console.log(i+ " : " + D[i] + "\n");
// }

let sum = BigInt(0);
for (let i = 1; i < 11; i++) {
  sum = sum + (BigInt(D[i][input - 1]) % mod);
}

console.log(Number(sum % mod));
