const fs = require('fs');
let input = fs.readFileSync("./dev/stdin").toString().trim().split('\n');

const testCaseNum = +input.shift();

let A = input[0].split(' ').map(v=>+v);
let D = new Array(testCaseNum).fill(1);

// console.log(A);
// console.log(D);

for(let i=1; i<A.length; i++) {
  for(let j=0; j<i; j++) {
    if(A[i] < A[j]) {
        D[i] = Math.max(D[i], D[j] + 1);
    }
  }
}

// console.log(A);
// console.log(D);

console.log(Math.max(...D));