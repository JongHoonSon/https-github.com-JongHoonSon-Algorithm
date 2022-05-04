const fs = require("fs");
let input = fs
  .readFileSync("./dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => +v);
input.pop();
const answer = [];

// 100만 이하의 수에 대해 소수 여부를 저장하는 배열
const isPrimeArray = new Array(1000001).fill(true);
isPrimeArray[0] = isPrimeArray[1] = false;

let m;

// 제곱근(올림)을 구함
let sqrt = Math.ceil(Math.sqrt(1000001));

// (홀수인 소수를 구하는 과정)
// 제곱근까지 반복
for (let i = 2; i < sqrt; i++) {
  // 만약 i가 소수가 아니라면 넘어감
  if (!isPrimeArray[i]) {
    continue;
  }

  let flag = true;

  // 만약 i가 1부터 i-1까지의 수의 배수일 경우 (= 짝수일 경우), flag를 false로 바꿈
  for (let j = 2; j < i; j++) {
    if (i % j === 0) {
      flag = false;
      break;
    }
  }

  // 만약 1부터 i-1까지의 수의 배수가 아닐 경우 (= 홀수인 소수)
  if (flag) {
    // console.log("i : ", i);
    // i의 배수를 모두 소수가 아닌 것으로 처리
    for (let k = i + i; k <= 1000000; k = k + i) {
      isPrimeArray[k] = false;
    }
  }
}

// 2는 소수이지만, 홀수인 소수가 아니므로 false 처리함
isPrimeArray[2] = false;

// 소수인 숫자들만 prime_list 에 넣음
const prime_list = [];
isPrimeArray.forEach((v, i) => {
  if (v) {
    prime_list.push(i);
  }
});

// console.log("prime_list", prime_list.join(" "));

// input으로 들어온 숫자를 하나씩 검사
input.forEach((v) => {
  // 모든 소수에 대해 v와 비교
  for (let i = 0; i < prime_list.length; i++) {
    // 소수가 v보다 크면 (이전 과정에서 v를 소수의 합으로 나타낼 수 없었고, 이제 v보다 큰 소수까지 왔음)
    if (prime_list[i] > v) {
      answer.push(`Goldbach's conjecture is wrong.`);
    }
    let possible = false;

    // 이중 반복문으로 소수 두개의 합을 구함
    for (let j = 0; j < prime_list.length; j++) {
      // 합이 v보다 큰 경우, 안쪽 반복문 종료
      if (prime_list[i] + prime_list[j] > v) {
        break;
      }

      // 합이 v와 같을 경우, v를 두 홀수 소수의 합으로 나타낼 수 있음
      if (prime_list[i] + prime_list[j] == v) {
        answer.push(`${v} = ${prime_list[i]} + ${prime_list[j]}`);
        possible = true;
      }
    }

    // v를 두 홀수 소수의 합으로 나타낼 수 있는 경우 종료
    if (possible) {
      break;
    }
  }
});

console.log(answer.join("\n"));
