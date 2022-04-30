const fs = require('fs');
let input = fs.readFileSync("./dev/stdin").toString().trim().split('\n').map(v=>+v);
let answer = [];

let inputCopy
for(let i=0; i<9; i++) {
  for(let j=0; j<9; j++) {
    if(i===j) {
      continue;
    }
    inputCopy = input.slice();
    inputCopy[i] = 0;
    inputCopy[j] = 0;
    // console.log(inputCopy);

    let sum = 0;
    for(let k=0; k<9; k++) {
      sum = sum + inputCopy[k];
      // console.log(sum);
    }
    if(sum === 100) {
      for(let k=0; k<9; k++) {
        answer.push(inputCopy[k]);
      }
    }
    if(answer.length > 0) {
      break;
    }
  }
  if(answer.length > 0) {
    break;
  }
}
answer = answer.sort((a, b) => a - b);
// console.log(answer);
answer.shift();
answer.shift();
console.log(answer.join('\n'));