const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString();

// 원판의 갯수
const N = +input;

// 옮긴 횟수를 저장하는 변수
let count = 0;

// 옮긴 경로를 저장하는 변수
let answer = [];

// 하노이 탑을 이동하기 위한 함수
// num은 현재 원판의 번호이며,
// from은 원판이 이동해온 곳,
// to는 원판이 이동한 곳,
// other은 남은 한 곳이다
function Hanoi(num, from, other, to) {
  // 원판의 총 갯수에서 -1해가며,
  // 원판이 없는 곳 (맨 위의 원판보다 한층 더 위)까지 도달했으면 재귀를 종료함
  // (이후 맨 위에 있는 원판(num === 1인 원판)부터 수행됨)
  // 호출 순서 : N -> 1
  // 수행 순서 : 1 -> N
  if (num === 0) {
    return;
  } else {
    // num - 1개의 원판을 남은 위치(other)로 이동시킨다.
    Hanoi(num - 1, from, to, other);

    // 수행 순서에 따라 맨 위에 있는 원판1부터 본인이 이동한 경로를 answer에 저장
    // console.log(`LOG : ${num}를 ${from}에서 ${to}로 이동했습니다.`);
    answer.push([from, to]);

    // 옮긴 횟수 + 1
    count++;

    // other자리에 옮겨놨던 num-1개의 원판을 to로 이동시킨다.
    Hanoi(num - 1, other, from, to);
  }
}

// 최종목표 : N개의 원판을 1번 위치에서 3번 위치로 이동시키는 것
Hanoi(N, "1", "2", "3");
console.log(count);
console.log(answer.map((element) => element.join(" ")).join("\n"));

// 문제 풀이 접근 방식

// 하노이 탑 문제를 핵심을 이해하면 풀 수 있는 문제이다.
// 모든 하노이 탑을 3번 위치로 옮기기 위해서는
// 하노이 탑의 맨 밑에 있는 N번째 원판이 3번 위치 맨 밑에 있어야하고,
// 맨 밑의 N번째 원판을 제외한 나머지 1부터 N-1번째 원판은 2번에 쌓여있어야 한다.

// 또 N-1번째 원판 역시 N번째 원판과 마찬가지로
// 3번 위치의 맨 밑(정확히는 N번째 원판 위)으로 가야하고,

// N-1번째 원판을 제외한 1부터 N-2번째 원판은 1번에 쌓여있어야 한다.

// 위 과정을 반복하여 가장 마지막의 조건부터 맨처음 시작과정까지 재귀를 통해 역으로 계산하면
// 하노이 탑을 이동하기 위한 과정을 구할 수 있다.
