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

// 중복을 고를 수 있으므로 check 사용 x
// for(let i=0; i<N; i++) {
//     check[i] = false;
// }

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

  for (let i = min; i < N; i++) {
    string.push(values[i]);
    // 오름차순으로 정렬하기 위해 현재 단게에서 선택한 index 값 전달
    BT(step + 1, i);
    string.pop();
  }
}
