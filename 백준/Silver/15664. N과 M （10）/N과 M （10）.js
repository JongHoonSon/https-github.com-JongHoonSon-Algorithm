let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const N = +input[0].split(" ")[0];
const M = +input[0].split(" ")[1];

const values = input[1].split(" ");
// 입력 값을 오름차순으로 정렬
values.sort((a, b) => a - b);

// console.log(N);
// console.log(M);
// console.log(values);

let check = [];
let string = [];
const answer = [];

for (let i = 0; i < N; i++) {
  check[i] = false;
}

// console.log(check);

BT(0, 0);

// 결과 값의 중복 제거
const answerSet = new Set(answer);
// console.log(answerSet);

// 중복 제거 된 Set를 Array로 변환
const answerArray = [...answerSet];
console.log(answerArray.join("\n"));

function BT(step, min) {
  if (step === M) {
    answer.push(string.join(" "));
    return;
  }

  // 오름차순으로 골라야 하므로 min 사용
  for (let i = min; i < N; i++) {
    // 중복을 고를 수 없으므로 check 사용
    if (check[i] === true) {
      continue;
    }
    string.push(values[i]);
    check[i] = true;
    // 다음 함수에 i 전달
    BT(step + 1, i);
    string.pop();
    check[i] = false;
  }
}
