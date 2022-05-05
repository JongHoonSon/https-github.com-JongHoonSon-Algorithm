const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split(" ");

const numA = Number(input.shift());
const numB = Number(input.shift());

const numAB = numA - numB;

const two = calc(numA)[0] - (calc(numB)[0] + calc(numAB)[0]);
const five = calc(numA)[1] - (calc(numB)[1] + calc(numAB)[1]);

const answer = Math.min(two, five);

console.log(answer);

function calc(v) {
  let count_two = 0;
  let count_five = 0;

  for (let i = 2; i <= v; i = i * 2) {
    count_two = count_two + parseInt(v / i);
  }

  for (let i = 5; i <= v; i = i * 5) {
    count_five = count_five + parseInt(v / i);
  }

  return [count_two, count_five];
}

// 문제 풀이 접근 방식

// 얼핏보면 조합을 이용하는 문제인 것 같지만,
// 사실 팩토리얼을 이용하는 문제이다.

// nCm의 값은 n! / (n-m)! * m! 임을 고려하여
// 1676번 문제 : 팩토리얼 0의 개수에서 설명한 방법을 이용해서 풀면된다.

// n!, (n-m)!, m!이 가지고 있는 2와 5의 개수를 각자 구하여
// n!의 2의 개수에서 (n-m)!와 m!의 2의 개수를 합친 값을 뺀다.
// 5의 경우에도 동일한 방법으로 계산한다.
// 분자의 값에서 분모의 값을 빼는 이유는 나누기 연산자이기 때문이다.

// 맨 뒤에 0이 나오기 위해서는 2와 5의 개수가 적어도 1개씩은 있어야 가능하다.

// 1676번 문제 : 팩토리얼 0의 개수의 풀이 해설인
// https://leylaoriduck.tistory.com/512 에서 사용된
// 아래 설명을 참고

// 팩토리얼에서 뒤에 0이 나오려면 10이 곱해져야 한다.
// 10이 구해지려면 2나 5의 개수를 구해서 최소값을 구해야하는데,
// 이말은 즉, 2가 3개 5가 2개인 경우, 2와 5가 페어로 있어야 10이 되므로, 0은 2개가 된다.
