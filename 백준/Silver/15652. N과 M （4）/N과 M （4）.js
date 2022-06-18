let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split(" ");

const N = +input[0];
const M = +input[1];

// console.log(N);
// console.log(M);

let values = [];
let string = [];

const answer = [];

for (let i = 0; i < N; i++) {
  values.push(i + 1);
}

// console.log(values);
// console.log(check);

BT(0, 0);

console.log(answer.join("\n"));

function BT(step, min) {
  if (step === M) {
    answer.push(string.join(" "));
    return;
  }

  // 이전 함수로부터 받은 min 값의 -1을 해서
  // for문의 시작 값으로 사용한다. values[i] 는 값이고, i는 index 임을 고려
  // 아예 처음부터 i를 전달하고 let i=min 으로 사용해도 된다.
  for (let i = min; i < N; i++) {
    string.push(values[i]);
    // 오름차순으로 정렬하기 위해
    // 각 단계에서 찾은 값 value[i]을 다음 함수에 전달한다.
    BT(step + 1, i);
    string.pop();
  }
}
