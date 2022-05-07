let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

let N = +input[0];
const string = input[1].split(" ").map((v) => +v);
const arr = [];

// 길이 N 짜리 문자열의 마지막 요소를 arr에 넣는다.
arr.push(string[--N]);
let changeIndex;
let endFlag = false;

// console.log(N);
// console.log(string);
// console.log(arr);

while (true) {
  if (N === 0) {
    endFlag = true;
    break;
  }

  // 다음 순열 문제와 다르게 이전 순열 문제는
  // 뒤에서 부터 접근했을 때 수가 상승하는 경우를 찾는다.
  if (string[N] < string[--N]) {
    changeIndex = N;
    break;
  }
  arr.push(string[N]);
}

if (endFlag) {
  console.log(-1);
} else {
  let temp1 = string[changeIndex];
  let minGap = 10000;
  let minGapIndex;

  // changeIndex의 값(temp1에 저장된 값)보다 작으면서
  // 차이가 제일 적은 값을 찾는다.
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < temp1 && temp1 - arr[i] < minGap) {
      minGap = temp1 - arr[i];
      minGapIndex = i;
    }
  }

  // 두 값을 변경한다.
  string[changeIndex] = arr[minGapIndex];
  arr[minGapIndex] = temp1;

  // console.log("string", string);
  // console.log("changeIndex", changeIndex);
  // console.log("arr", arr);

  // 결과 출력
  console.log(string.slice(0, changeIndex + 1).join(" ") + " " + arr.join(" "));
  // console.log("string.slice(0, changeIndex+1)", string.slice(0, changeIndex+1));
  // console.log("arr", arr);
}

// 문제 접근 방식

// 다음 순열 문제와 다른 점은
// 순열의 맨뒤에서 역방향으로 진행하면서
// 1. 오름차순이 아닌 내림차순이 발생하는 값이 생기면 해당 자리의 값을 바꾼다는 점
// 2. 문자를 바꿀 때는 A보다 작고 차이가 제일 적은 값을 바꾼다는 점
// 두 가지이다.

// ex) 1423 이었다면
// 오름차순이 시작하는 4과,배열 arr에서 4보다 작으면서 가장 차이가 작은 값인 3를 변경하여
// 1324를 만들고,
// 배열 arr에 들어있는 42를 3 옆에 붙혀
// 1342를 만든다.
