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

// 중복으로 선택할 수 있으므로 check 제거
let check = [];
let string = [];
const answer = [];

// console.log(check);

BT(0, 0);

console.log(answer.join("\n"));

function BT(step, min) {
  if (step === M) {
    answer.push(string.join(" "));
    return;
  }

  // 이전 단계에서 선택한 index 값부터 탐색
  // 같은 수는 고를 수 있지만, 앞의 index의 수는 고를 수 없음
  for (let i = min; i < N; i++) {
    string.push(values[i]);
    // 이전 단계에서 선택한 index 값 전달
    BT(step + 1, i);
    string.pop();
  }
}
