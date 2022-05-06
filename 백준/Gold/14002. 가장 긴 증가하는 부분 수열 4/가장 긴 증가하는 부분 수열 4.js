const fs = require('fs');
let input = fs.readFileSync("./dev/stdin").toString().trim().split('\n');

const cases = +input.shift();

// console.log(cases);

const inputs = input[0].split(' ').map(v=>+v);

// console.log(numArray);

const dp = new Array(cases).fill(0);
const arr = [];

for(let i=0; i<cases; i++) {
  let max = 0;
  let maxIndex = -1;
  for(let j=0; j<i; j++) {
    if(inputs[i] > inputs[j] && dp[j] > max) {
      max = dp[j];
      maxIndex = j;
    }
  }
  dp[i] = max + 1;
  if(maxIndex !== -1) {
    arr[i] = arr[maxIndex].concat(inputs[i]);
  } else {
    arr[i] = [inputs[i]];
  }
}

let maxLength = Math.max(...dp);
console.log(maxLength);
console.log(arr[dp.indexOf(maxLength)].join(' '));
// console.log(arr[5]);
// console.log(arr[5][0]);
// console.log(arr[5][1]);

// console.log(dp);

// let max = 0;
// for(let i=0; i<cases; i++) {
//   if(max < dp[i]) {
//     max = dp[i];
//   }
// }

// console.log(max);
// const resultArray = [];

// for(let i=cases-1; i>=0; i--) {
//   if(max===0) {
//     break;
//   }
//   if(dp[i] === max) {
//     resultArray.push(inputs[i]);
//     // console.log("index : ", i);
//     max--;
//   }
// }

// console.log(resultArray.reverse().join(' ').trim());
