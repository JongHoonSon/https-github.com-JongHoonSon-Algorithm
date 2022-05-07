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

// 문자열의 뒤에서 부터 접근하며 오름차순일 경우 arr에 저장하고,
// 앞에 요소와 뒤의 요소를 비교하여 앞에 요소가 작으면 (= 내림차순이 시작되면)
// 해당 인덱스를 changeIndex에 저장한다.
while (true) {
  // 맨앞 요소까지 중간에 내림차순이 발견되어 break가 되지 않은 경우
  // N === 0 까지 반복문을 돌게되며, 이 경우 순열의 마지막 수이기 때문에
  // endFlag 를 true로 변경한다.
  if (N === 0) {
    endFlag = true;
    break;
  }
  if (string[N] > string[--N]) {
    changeIndex = N;
    break;
  }
  arr.push(string[N]);
}

// endFlag가 true(=중간에 내림차순이 없는 경우) 일 경우
// -1을 출력하고 종료한다.
if (endFlag) {
  console.log(-1);

  // endFlag가 false(=중간에 내림차순이 있는 경우) 일 경우
  // changeIndex의 값보다 큰 arr의 요소 중
  // 차이가 가장 작은 값을 찾아 서로를 변경한다.
} else {
  // console.log("string", string);
  // console.log("changeIndex", changeIndex);
  // console.log("arr", arr);

  // arr에서 changeIndex의 값보다 크고
  // 가장 차이가 적은 값의 index(minGapIndex) 를 찾는다.
  let temp1 = string[changeIndex];
  let minGap = 10000;
  let minGapIndex;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > temp1 && arr[i] - temp1 < minGap) {
      minGap = arr[i] - temp1;
      minGapIndex = i;
    }
  }

  // string의 changeIndex의 값과 arr의 minGapIndex의 값을 변경한다.
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

// 주어진 순열의 바로 다음 순열을 찾기 위해서는
// 먼저 순열의 맨뒤에서부터 역방향으로 진행하면서
// 오름차순인 문자들을 배열 A에 저장한다.
// 그러다가 갑자기 내림차순이 되는 문자가 발견되면
// 내림차순이 된 자리와 배열 A에 저장된 문자를 비교하여
// 내림차순이 된 자리의 값보다 크고, 차이가 가장 적은 문자를 배열 A에서 뽑는다.
// 이 둘의 자리를 바꾼 후에
// 내림차순이 된 자리의 값 옆에 배열 A의 값을 붙히면 순열의 다음 순열이 된다.
// (배열의 끝에서 부터 push했기 때문에 방향이 바뀌어 있음
// ex) 순열이 1432 이었다면, 1과 2를 변경하고, 2431에서 431이 134로 들어감)

// 만일 내림차순이 되는 문자가 발생하지 않는다면
// (맨 뒤에서 계속 오름차순이라면, ex) 54321 )
// 마지막 순열이므로 -1를 출력하면 된다.
