const fs = require('fs');
let input = fs.readFileSync("./dev/stdin").toString();

input = +input;

let D = new Array(3);

D[0] = new Array(100001).fill(0);
D[1] = new Array(100001).fill(0);
D[2] = new Array(100001).fill(0);

D[0][1] = 1;
D[1][1] = 1;
D[2][1] = 1;

for(let i=2; i<=100000; i++) {
  D[0][i] = (D[0][i-1] + D[1][i-1] + D[2][i-1]) % 9901;
  D[1][i] = (D[0][i-1] + D[2][i-1]) % 9901;
  D[2][i] = (D[0][i-1] + D[1][i-1]) % 9901;
}

// console.log(D[0][2]);
// console.log(D[1][2]);
// console.log(D[2][2]);

console.log((D[0][input] + D[1][input] + D[2][input]) % 9901);