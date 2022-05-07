let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const N = +input.shift();

// console.log(N);

let array = [];

for (let i = 0; i < 20; i++) {
  array.push(0);
}

for (let i = 0; i < N; i++) {
  const line = input.shift().trim();
  if (line === "all") {
    array = [];
    for (let i = 0; i < 20; i++) {
      array.push(1);
    }
  } else if (line === "empty") {
    array = [];
    for (let i = 0; i < 20; i++) {
      array.push(0);
    }
  } else {
    const command = line.split(" ")[0];
    const x = line.split(" ")[1];

    if (command === "add") {
      array[x - 1] = 1;
    } else if (command === "remove") {
      array[x - 1] = 0;
    } else if (command === "check") {
      if (array[x - 1] === 1) {
        console.log(1);
      } else {
        console.log(0);
      }
    } else if (command === "toggle") {
      if (array[x - 1] === 1) {
        array[x - 1] = 0;
      } else {
        array[x - 1] = 1;
      }
    }
  }
}

// 풀이 접근 방식

// 배열을 이루는 요소의 존재여부를 2진수로 나타내는 방법인 비트마스크를 사용
// 1부터 20까지의 수를 기록하기 위해 길이가 20인 배열 사용

// add x 연산은 x-1인덱스의 값을 1로 바꾼다.
// remove x 연산은 x-1인덱스의 값을 0으로 바꾼다.
// check x 연산은 x-1인덱스의 값을 출력한다.
// toggle x 연산은 x-1인덱스의 값이 0이면 1로, 1이면 0으로 바꾼다.
// all 연산은 배열을 이루는 요소들의 값이 1인 새로운 배열을 만든다.
// empty 연산은 배열을 이루는 요소들의 값이 0인 새로운 배열을 만든다.

// node.js의 메모리 제한이 설정되어 있지 않아 제출할 수 없었음.
