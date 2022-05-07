const fs = require("fs");
let input = fs
  .readFileSync("./dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => +v);
let answer = [];

let inputCopy;

// i는 0부터 8까지 반복
for (let i = 0; i < 9; i++) {
  // j는 0부터 8까지 반복
  for (let j = 0; j < 9; j++) {
    // i, j가 같다면 넘어감
    if (i === j) {
      continue;
    }

    // inputCopy에 input값 복사
    inputCopy = input.slice();

    // inputCopy의 i, j 인덱스의 값을 0으로 함
    inputCopy[i] = 0;
    inputCopy[j] = 0;
    // console.log(inputCopy);

    // 9명중 2명(i와 j)를 제외한 나머지 7명의 합을 구함
    let sum = 0;
    for (let k = 0; k < 9; k++) {
      sum = sum + inputCopy[k];
      // console.log(sum);
    }

    // 합이 100이라면, 일단 9명을 모두 answer에 푸시함
    if (sum === 100) {
      for (let k = 0; k < 9; k++) {
        answer.push(inputCopy[k]);
      }
    }
    if (answer.length > 0) {
      break;
    }
  }
  if (answer.length > 0) {
    break;
  }
}

// 오름차순으로 정렬
answer = answer.sort((a, b) => a - b);
// console.log(answer);

// 제외한 2명의 값이 0인 걸 감안해서 앞에서 2명을 제외
answer.shift();
answer.shift();

// 답 출력
console.log(answer.join("\n"));

// 문제 풀이 접근 방식

// 쉬운 문제이다.
// input으로 주어진 수열을 이중 반복문으로 반복하며
// 9명 중 2명을 제외한 나머지 사람들의 키의 합이 100인지 확인하고
// 키의 합이 100이라면 해당 멤버들을 출력하면 된다.
