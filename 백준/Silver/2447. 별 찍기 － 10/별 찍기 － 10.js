const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString();

const n = +input;

// console.log("n", n);

let graph = new Array(n);

for (let i = 0; i < n; i++) {
  graph[i] = new Array(n).fill("*");
}

for (let i = 0; i < n; i++) {
  // console.log(graph[i]);
}

puncher(n, 0, 0);

// console.log("after");
for (let i = 0; i < n; i++) {
  console.log(graph[i].join(""));
}

function puncher(length, x, y) {
  // 만약 그래프의 길이가 1이면 재귀 종료
  if (length === 1) {
    return;
  }

  // 현재 그래프의 길이 (length)의 1/3 지점
  const startPunchIndex = length / 3;

  // 현재 그래프의 길이 (length)의 2/3 지점
  const endPunchIndex = (length / 3) * 2;

  // 9분할 했을 때 나오는 가운데 부분의 값을 공백으로 변경 (구멍 뚫기)
  for (let i = startPunchIndex; i < endPunchIndex; i++) {
    for (let j = startPunchIndex; j < endPunchIndex; j++) {
      graph[i + x][j + y] = " ";
    }
  }

  // 나머지 8개의 분할 범위에 대해 재귀 호출
  // (재귀로 호출되는 좌표의 그래프의 가운데 부분을 구멍 뚫기 위함)
  // 그래프의 크기는 현재 그래프의 크기를 1/3한 startPunchIndex 값 이용
  puncher(startPunchIndex, 0 + x, 0 + y);
  puncher(startPunchIndex, 0 + x, startPunchIndex + y);
  puncher(startPunchIndex, 0 + x, endPunchIndex + y);
  puncher(startPunchIndex, startPunchIndex + x, 0 + y);
  puncher(startPunchIndex, startPunchIndex + x, endPunchIndex + y);
  puncher(startPunchIndex, endPunchIndex + x, 0 + y);
  puncher(startPunchIndex, endPunchIndex + x, startPunchIndex + y);
  puncher(startPunchIndex, endPunchIndex + x, endPunchIndex + y);
}

// 문제 풀이 방식

// 문제에서 주어진 조건대로 그래프를 완성하기 위해서는
// 먼저 입력으로 주어진 n을 이용해 별(*)로 채워진 n x n 크기의 그래프를 생성한 후
// 그래프의 가운데 부분을 공백으로 바꾸는 puncher함수를 이용해
// n x n 크기의 그래프의 가운데에 구멍을 뚫고,
// 또, n/3 x n/3 크기의 그래프의 가운데에 구멍을 뚫는 과정을
// n의 크기가 1이 될 때까지 재귀적으로 반복하면 된다.

// 재귀는 한 그래프당 8번 호출면 되는데, 그 이유는 아래와 같다.

// 예를 들어 n이 27인 그래프가 존재한다면
// 해당 그래프를 9분할하여,
// 먼저 1/3 지점(startPunchIndex)인 '9'이상부터
// 2/3 지점(endPunchIndex)인 '18'미만까지는 구멍을 뚫고,
// 나머지 8개의 부분에 대해 재귀함수를 호출하면 된다.

// 위의 예시에 대해 추가적으로 설명하자면,
// x와 y는 0~8, 9~17, 18~27로 3분할 할 수 있고,
// 크기가 length x length 인 그래프를 3분할 x 3분할 = 9분할 할 수 있다.
// 이중 가운데에 있는 분할을 구멍을 뚫고
// 나머지 8분할을 다시 재귀하면 된다.
