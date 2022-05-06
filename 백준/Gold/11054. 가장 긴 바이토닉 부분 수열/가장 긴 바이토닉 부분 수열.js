const fs = require('fs');
let input = fs.readFileSync("./dev/stdin").toString().trim().split('\n');

const num = +input.shift();

let A = input[0].split(' ').map(v=>+v);
let D = new Array(num).fill(1);
let F = new Array(num).fill(1);

// console.log(A);
// console.log(D);
// console.log(F);


for(let i=1; i<num; i++) {
  for(let j=0; j<i; j++) {
    if(A[i] > A[j]) {
      D[i] = Math.max(D[i], D[j]+1);
    }
  }
}

for(let i=1; i<num; i++) {
  for(let j=0; j<i; j++) {
    if(A[i] < A[j]) {
      F[i] = Math.max(F[i], D[j]+1, F[j]+1);
    }
  }
}

// console.log(D);
// console.log(F);

console.log(Math.max(...F));