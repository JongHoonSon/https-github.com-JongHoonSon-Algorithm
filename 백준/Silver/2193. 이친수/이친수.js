const fs = require('fs');
let input = fs.readFileSync("./dev/stdin").toString();

input = Number(input);

// console.log(input);

let D = new Array(2);

const resetNum = BigInt(-1);

D[0] = new Array(91).fill(resetNum);
D[1] = new Array(91).fill(resetNum);

// 
D[0][0] = BigInt(0);
D[1][0] = BigInt(1);

// console.log(D[0][0]);
// console.log(D[1][0]);

function DP(x, y) {
  if(D[x][y] !== BigInt(-1)) {
    return D[x][y];
  } else if(x===0) {
    D[x][y] = DP(x, y-1) + DP(x+1, y-1);
  } else if(x===1) {
    D[x][y] = DP(x-1, y-1);
  }
  return D[x][y];
}

// console.log(DP(0, input-1) + DP(1, input-1))
console.log((DP(0, input-1) + DP(1, input-1)).toString());

// console.log(DP(0, 0));
// console.log(DP(1, 0));
// console.log("");
// console.log(DP(0, 1));
// console.log(DP(1, 1));
// console.log("");
// console.log(DP(0, 2));
// console.log(DP(1, 2));
// console.log("");
// console.log(DP(0, 3));
// console.log(DP(1, 3));
// console.log("");
// console.log(DP(0, 4));
// console.log(DP(1, 4));
// console.log("");
// console.log(DP(0, 5));
// console.log(DP(1, 5));
 