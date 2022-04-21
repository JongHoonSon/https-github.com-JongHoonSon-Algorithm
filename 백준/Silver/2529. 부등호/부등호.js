let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const N = +input.shift();
let inequality = input.shift().trim().split(" ");
let value = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let check = [];
let comb = [];
let answer = [];
let isFalse;

for (let i = 0; i < N; i++) {
  check.push(false);
}

// console.log(check);
// console.log(inequality);
BT(0);
// console.log("answer : ", answer);

let max = Math.max(...answer);
let min = Math.min(...answer);

// 자릿수를 맞추기 위해 padStart 사용
// 12 -> 012 로 변환해줌
const maxString = String(max).padStart(N + 1, "0");
const minString = String(min).padStart(N + 1, "0");

console.log(maxString);
console.log(minString);

function BT(step) {
  // N개의 부등호에 충족되는지 확인해볼 N+1 길이의 문자열(comb)
  if (step === N + 1) {
    // console.log(comb);

    isFalse = false;

    // 모든 부등호에 충족되는지 확인
    for (let j = 0; j < N; j++) {
      if (inequality[j] === "<") {
        if (!(comb[j] < comb[j + 1])) {
          isFalse = true;
          break;
        }
      } else {
        if (!(comb[j] > comb[j + 1])) {
          isFalse = true;
          break;
        }
      }
    }

    // isFalse === true 일 경우,
    // 앞에서 부등호에 충족되지 않는 부분이 있었다는 뜻이므로 return 시킴.
    // !isFalse 인 것(부등호에 다 충족되는 경우)만 해당 comb를 answer에 push함
    if (!isFalse) {
      answer.push(comb.join(""));
    }
    return;
  }

  for (let i = 0; i < 10; i++) {
    if (check[i] === true) {
      continue;
    }
    comb.push(i);
    check[i] = true;
    BT(step + 1);
    comb.pop();
    check[i] = false;
  }
}

// 풀이 접근 방식

// 부등호로 이루어진 문자열의 길이 N보다 +1 만큼 수가 필요하므로
// 해당 부등호로 만들 수 있는 모든 경우의 수를 구하기 위해
// 0~9를 조합해 만들 수 있는 길이 N+1의 문자열을 BT를 이용해 만든 후(순열 구하기)

// 각 문자열에 대해서
// j번째 부등호로 문자열의 j번째수와 j+1번째수를 비교한다.
// 모든 부등호를 만족하는 문자열이라면 해당 문자열을 answer 배열에 담는다.
// 마지막으로 answer에서 최솟값과 최댓값을 출력한다.
