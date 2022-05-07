let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const N = +input.shift();
let values = new Array(N);
let visited = [];
let path = [];
let sum = 0;
let min = 5000000;

for (let i = 0; i < N; i++) {
  values[i] = input[i].split(" ").map((v) => +v);
  visited.push(false);
  // console.log(values[i]);
}

// console.log(visited);
// console.log(values[0][0]);
// console.log(values[0][1]);
// console.log(values[0][2]);
// console.log(values[0][3]);

BT(0);

console.log(min);

function BT(step) {
  if (step === N) {
    // console.log("path : ", path);
    // 첫 도시
    const firstIndex = path[0];
    // 마지막 도시
    const lastIndex = path[path.length - 1];

    // 첫 도시에서 마지막 도시까지 방문할 때 드는 비용이 0인지 확인
    for (let i = 1; i < N; i++) {
      if (values[path[i - 1]][path[i]] === 0) {
        return;
      }
    }
    // 마지막 도시에서 첫 도시로 돌아올 때 드는 비용이 0인지 확인
    if (values[lastIndex][firstIndex] === 0) {
      return;
    }

    // 누적 값 초기화
    sum = 0;

    // 첫 도시에서 마지막 도시까지 방문할 때 드는 비용
    for (let i = 1; i < N; i++) {
      sum = sum + values[path[i - 1]][path[i]];
    }

    // 마지막 도시에서 첫 도시로 돌아올 때 드는 비용
    sum = sum + values[lastIndex][firstIndex];

    // 최솟값 갱신
    if (sum < min) {
      min = sum;
    }
    // console.log(sum);
    return;
  }
  for (let i = 0; i < N; i++) {
    if (visited[i] === true) {
      continue;
    }
    path.push(i);
    visited[i] = true;
    BT(step + 1);
    path.pop();
    visited[i] = false;
  }
}

// 문제 풀이 접근 방식

// 기존의 순열 찾기와 비슷하나, 주어진 행렬로부터 만들 수 있는 순열을
// 값 그자체로 사용하는 것이 아니라, 2차원 배열인 values에서 index 값으로 사용한다는 특징이 있다.

// 문제를 보면 모든 도시를 한 번씩만 방문한 후 마지막에는 처음에 출발한 도시로 돌아와야 한다고 되어있다.
// 따라서 NxN 행렬의 각 행에서 숫자 하나씩 선택할 수 있으며 각 행이 선택한 것들의 열은 중복되지 않는다.
// (즉, 4x4 행렬에서는 4개를 선택할 수 있고, 4개의 행과 열 값은 모두 다르다.)

// 1부터 N으로 만들 수 있는 순열을 첫번째부터 마지막 행까지 순서대로 한 개씩 배정하면 순열을 구성하는 모든 문자열을 다 찾을 수 있고,
// 순열을 구성하는 각각의 문자열은 구하는 과정에서 path(경로) 배열에 push 된다.
// path의 마지막 문자까지 찾은 경우(step===N 인 경우)에는 path 중에서 값이 0인 것이 있는지 확인한다. (문제의 조건)
// 0인 값이 없다면, 각 경로를 이동하는 데 드는 값이 저장된 배열 values에서 values[출발index][도착index]의 값을 찾아 sum에 누적시키고
// 마지막 도시에서 첫 도시로 돌아올 때 드는 값 values[path[마지막]][path[처음]] 을 sum에 더해주면 해당 경로대로 이동하는 대 드는 값을 구할 수 있다.
// 이를 min값과 갱신하여 이동 가능한 모든 경로 중에서 최솟값을 찾는다.
