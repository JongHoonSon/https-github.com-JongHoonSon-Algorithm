const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString();

const n = +input;

// console.log("n", n);

let answer = [];

answer.push("어느 한 컴퓨터공학과 학생이 유명한 교수님을 찾아가 물었다.");

recursive(n, "");

console.log(answer.join("\n"));

// 각 단계에서 answer에 추가될 문장은 prefix를 앞에 붙힘
function recursive(n, prefix) {
  answer.push(`${prefix}"재귀함수가 뭔가요?"`);

  // 마지막 재귀에서 추가되는 문장
  if (n === 0) {
    answer.push(`${prefix}"재귀함수는 자기 자신을 호출하는 함수라네"`);
    answer.push(`${prefix}라고 답변하였지.`);
    return;
  }

  answer.push(
    `${prefix}"잘 들어보게. 옛날옛날 한 산 꼭대기에 이세상 모든 지식을 통달한 선인이 있었어.`
  );
  answer.push(
    `${prefix}마을 사람들은 모두 그 선인에게 수많은 질문을 했고, 모두 지혜롭게 대답해 주었지.`
  );

  answer.push(
    `${prefix}그의 답은 대부분 옳았다고 하네. 그런데 어느 날, 그 선인에게 한 선비가 찾아와서 물었어."`
  );

  // n이 0이 될때까지 재귀 호출함
  // prefix의 길이를 늘림
  recursive(n - 1, prefix + "____");

  answer.push(`${prefix}라고 답변하였지.`);
}
