const fs = require("fs");
const { stringify } = require("querystring");
const input = fs.readFileSync("./dev/stdin").toString().split("\n");

let testCaseNum = +input[0];
let testCase;

// 1만 이하의 수 중에서 소수 찾기
let isPrimeArray = new Array(10000 + 1).fill(true);
isPrimeArray[0] = isPrimeArray[1] = false;

let m;
let sqrt = Math.ceil(Math.sqrt(10000));
for (let i = 2; i <= sqrt; i++) {
  m = 2;
  while (i * m <= 10000) {
    isPrimeArray[i * m] = false;
    m++;
  }
}

// 모든 테스트케이스에 대해 1부터 테스트케이스 사이에 있는 소수를 primeArray에 넣기
let gap;
let min = 0;
let max = 0;
for (let i = 0; i < testCaseNum; i++) {
  gap = 10000;
  testCase = +input[i + 1];

  let primeArray = [];

  for (let i = 2; i <= testCase; i++) {
    if (isPrimeArray[i]) {
      primeArray.push(i);
    }
  }

  // console.log(primeArray);

  // primeArray에 들어있는 모든 값에 대해 이중 반복문을 수행하며
  // 짝수를 두 소수의 합으로 나타내는 표현인 골드바흐 파티션 구하기
  for (let j = 0; j < primeArray.length; j++) {
    for (let k = 0; k < primeArray.length; k++) {
      // 만약 두 소수의 합이 테스트케이스와 같으면(= 골드바흐 파티션)
      if (primeArray[j] + primeArray[k] === testCase) {
        // 만약 두 소수가 같으면, min과 max를 해당 소수로 함
        if (j == k) {
          min = max = primeArray[j];
          break;

          // 만약 두 소수가 다르고, 테스트케이스를 만드는 소수 중에서 기존의 찾은 조합보다 gap이 더 작은 소수의 조합이라면
          // 두 수의 차이를 gap에 저장, 큰 값을 max에 저장 작은 값을 min에 저장함
        } else if (j > k) {
          if (gap > j - k) {
            gap = j - k;
            max = primeArray[j];
            min = primeArray[k];
          }
        } else if (j < k) {
          if (gap > k - j) {
            gap = k - j;
            max = primeArray[k];
            min = primeArray[j];
          }
        }
      }
    }
  }
  console.log(`${min} ${max}`);
}
