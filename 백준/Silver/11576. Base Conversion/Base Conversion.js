const fs = require('fs');
let input = fs.readFileSync("./dev/stdin").toString().trim().split('\n');

const A = +input[0].split(' ')[0];
const B = +input[0].split(' ')[1];

// console.log(A);
// console.log(B);

const m = +input[1];

// console.log(m);

const numArray = input[2].split(' ').map(v=>+v);

// console.log(numArray);

let Ato10 = 0;

for(let i=0; i<m; i++) {
  const num = numArray.pop();
  Ato10 = Ato10 + num * Math.pow(A, i);
}

// console.log(Ato10);

let toB = [];

while(Ato10!== 0) {
  const rest = Ato10%B;
  toB.push(rest);
  Ato10 = Math.floor(Ato10/B);
}

// console.log(toB);

toB.reverse();

// console.log(toB);
console.log(toB.join(' ').trim());