let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const N = +input.shift();

// console.log("N", N);

let graph = new Array(N + 1);

// DFS 탐색 시에 이동할 수 있는 X, Y 방향을 담은 배열 (index 이용)
let moveX = [-1, 1, 0, 0];
let moveY = [0, 0, -1, 1];

for (let i = 0; i < N; i++) {
  const line = input.shift().trim();
  graph[i] = line.split("").map((v) => +v);
}

for (let i = 0; i < N; i++) {
  // console.log(`graph[${i}] : `, graph[i]);
}

// townNum 단지를 구분하기 위한 번호, 각 집의 값은 townNum으로 바뀜
let townNum = 2;

// townArr는 모든 단지를 저장하고 있는 배열
let townArr = [];

// 2차원 배열의 첫번째 index부터 마지막 index까지 탐색
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    // DFS의 결과가 true이다 => 탐색 가능한 지역이다
    if (DFS(i, j, townNum) === true) {
      // 해당 지역의 단지 번호를(townNum)을 단지 목록(townArr)에 추가
      townArr.push(townNum);

      // 다음에 찾게되는 단지의 번호 설정
      townNum++;
    }
  }
}

// 단지의 총 갯수 출력
console.log(townArr.length);

let houseCntPerTownArr = new Array(townArr.length).fill(0);

// 각 단지 별 집의 수를 구하기 위해
// 전체 집에 대해
// 집이 갖고 있는 값((graph[i][j])이
// 특정 단지의 번호(townArr[k])와 같으면
// 모든 단지의 집의 수를 저장하는 houseCntPerTownArr에서
// 해당 단지의 집의 수 증가(houseCntPerTownArr[k]++)
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    for (let k = 0; k < townArr.length; k++) {
      if (graph[i][j] === townArr[k]) {
        houseCntPerTownArr[k]++;
      }
    }
  }
}

// 단지별 집의 수를 오름차순으로 정렬
houseCntPerTownArr.sort((a, b) => a - b);

// 단지별 집의 수 출력 (오름차순)
console.log(houseCntPerTownArr.join("\n"));

function DFS(i, j, toBe) {
  // console.log("i & j : ", i, j);

  // 범위를 벗어난 곳을 탐색하려 하면 false 리턴
  if (i < 0 || i >= N || j < 0 || j >= N) {
    return false;
  }

  const x = graph[i][j];

  // 집이 없는 곳(0)을 탐색하려 하면 false 리턴
  if (x === 0) {
    return false;
  }

  // 집이 있는 곳이면
  if (x === 1) {
    // 현재 집의 정보를 속한 단지의 번호(townNum)로 변경
    graph[i][j] = toBe;

    // 현재 집에서 상하좌우로 이동
    for (let a = 0; a < moveX.length; a++) {
      const ni = i + moveY[a];
      const nj = j + moveX[a];

      DFS(ni, nj, toBe);
    }

    return true;
  }
}
