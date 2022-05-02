const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().split(" ");

const minNum = +input[0];
const maxNum = +input[1];

// 1부터 maxNum + 1 까지의 숫자들의 소수 여부를 담고 있는 배열
// (기본 값은 일단 true로 놓고 반복문을 돌면서 소수가 아닌 곳의 값을 false로 변경함)
let isPrimeNumber = new Array(maxNum + 1).fill(true);

// 0번째 수와 1번째 수는 소수가 아니므로 false처리함,
isPrimeNumber[0] = isPrimeNumber[1] = false;

// maxNum의 제곱근을 올림한 값 = sqrtMaxNum ( ex) maxNum이 10이면 3.33을 올림한 4가 됨)
let sqrtMaxNum = Math.ceil(Math.sqrt(maxNum));

// 2부터 sqrtMaxNum까지 1씩 증가하며 반복
for (let i = 2; i <= sqrtMaxNum; i++) {
  // 만약 i가 소수라면, i의 배수는 소수가 아니므로, isPrimeNumber에 들어있는 i의 배수를 모두 false 처리함
  if (isPrimeNumber[i]) {
    let m = 2;
    // i의 m의 배수는 소수가 아니므로, false 처리함
    while (m * i <= maxNum) {
      isPrimeNumber[i * m] = false;
      m++;
    }
  }
}

let prime = [];

// minNum과 maxNum 사이에 있는 소수 골라내기
// (isPrimeNumber에서 true를 갖고 있는 값의 index)
for (let i = minNum; i <= maxNum; i++) {
  if (isPrimeNumber[i]) {
    prime.push(i);
  }
}

console.log(prime.join("\n"));
