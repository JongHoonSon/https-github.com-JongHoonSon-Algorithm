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

// 문제 풀이 접근 방식

// 소수를 구하는 방식 중에서 1부터 주어진 범위의 최댓값까지 1씩 증가시키면서 확인하는 방법은 시간 초과가 발생할 수 있다. 시간복잡도 O(n^2)
// 따라서 범위의 최댓값의 제곱근을 이용해서 소수를 구하는 방법을 사용하면 시간을 줄일 수 있다.

// 먼저 범위의 최댓값의 제곱근을 구한 후, 2부터 제곱근까지 반복하면서
// 해당 범위 안에 있는 isPrimeNumber 값의 배수(x2부터)가 되는 값의 소수 여부를 false로 처리한다.

// 예를 들어 범위의 최댓값이 20이었다면, 제곱근은 5이고 (4.xx에서 올림),
// 2부터 5까지 반복하면서 2의 배수, 3의 배수, 4의 배수, 5의 배수가 되는 수(x2부터)의 소수 여부를 모두 false 처리하면

// x의 배수 중에 본인을 제외한 수(곱하기 2부터)
// 2의 배수인 4, 6, 8, 10, 12, 14, 16, 18, 20
// 3의 배수인 9, 12, 15, 18
// 4의 배수인 8, 12, 16, 20
// 5의 배수인 10, 15, 20

// 위의 수의 소수 여부가 모두 false 처리된다.
// 따라서 1부터 20까지의 수 중에서 소수 여부가 true인 수는
// 2, 3, 5, 7, 11, 13, 17, 19 가 남게된다.
