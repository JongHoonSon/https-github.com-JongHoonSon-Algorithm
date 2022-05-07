let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

let i = 0;
let answer = [];
let values;
let N;
let check;
let string;

while (true) {
  // 마지막 줄(값이 0) 인지 확인하고 종료
  if (input[i] === "0") {
    break;
  }

  // 두 번째 줄 부터 사이에 공백 줄 추가
  if (i >= 1) {
    answer.push("");
  }

  // 기존의 BT 문제해서 썼던 방식
  values = input[i]
    .trim()
    .split(" ")
    .map((v) => +v);
  N = +values.shift();
  check = [];
  string = [];

  for (let j = 0; j < N; j++) {
    check.push(false);
  }

  BT(0, 0);

  i++;
}

console.log(answer.join("\n"));

function BT(step, min) {
  if (step === 6) {
    answer.push(string.join(" "));
    return;
  }
  for (let j = min; j < N; j++) {
    if (check[j] === true) {
      continue;
    }
    string.push(values[j]);
    check[j] = true;

    // 입력이 오른차순으로 정렬되어 있고,
    // 찾는 답 역시 오름차순이어야 하므로
    // 방금 찾은 값의 index (j)를 전달하고
    // 다음 함수에서 for문의 시작값으로 사용해
    // 방금 찾은 수보다 오른쪽에 위치하는 값(더 큰 값)만
    // 선택할 수 있도록 한다.
    BT(step + 1, j);
    string.pop();
    check[j] = false;
  }
}
