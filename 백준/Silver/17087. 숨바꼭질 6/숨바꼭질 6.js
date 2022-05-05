const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const firstLineArray = input[0].split(" ");

const sisterNum = Number(firstLineArray[0]);
const suminPosition = Number(firstLineArray[1]);
const sisterPosition = input[1].split(" ").map((v) => +v);
let gcd;

if (sisterNum !== 1) {
  for (let i = 0; i < sisterNum; i++) {
    if (gcd == undefined) {
      gcd = getGCD(
        Math.abs(sisterPosition[i] - suminPosition),
        Math.abs(sisterPosition[i + 1] - suminPosition)
      );
    } else {
      gcd = getGCD(gcd, Math.abs(sisterPosition[i] - suminPosition));
    }
  }
} else {
  gcd = Math.abs(sisterPosition[0] - suminPosition);
}
console.log(gcd);

// a와 b의 GCD(최대공약수) 구하기
function getGCD(a, b) {
  let temp;

  // b가 0이 아니라면 반복함
  while (b != 0) {
    // temp에 a를 b로 나눈 나머지를 저장
    temp = a % b;

    // b를 a에 저장
    a = b;

    // temp를 b에 저장
    b = temp;
  }

  // b가 0이 되면 a 리턴
  return a;
}

// ex) 15와 12의 GCD 구하는 과정

// while 1번째 반복
// a = 15, b = 12
// temp = 15%12 = 3
// a = b = 12
// b = temp = 3

// while 2번째 반복
// a = 12, b = 3
// temp = 12%3 = 0
// a = b = 3
// b = temp = 0

// b가 0이므로 a 출력, a는 15와 12의 최대공약수인 3

// 과정 설명

// A와 B중에 큰 수로 작은 수를 나눈 나머지가
// 작은 수와 나눠 떨어지면, 해당 나머지가 A와 B의 최대공약수가 됨
