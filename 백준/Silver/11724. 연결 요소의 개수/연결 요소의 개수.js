let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const N = +input[0].split(" ")[0];
const M = +input[0].split(" ")[1];
let check = new Array(N + 1).fill(false);
let graph = new Array(N + 1);
let count = 0;

for (let i = 1; i <= N; i++) {
  graph[i] = new Array();
}

for (let i = 1; i <= M; i++) {
  const a = +input[i].split(" ")[0];
  const b = +input[i].split(" ")[1];

  // console.log("a", a);
  // console.log("b", b);

  graph[a].push(b);
  graph[b].push(a);
}

for (let i = 1; i <= N; i++) {
  // console.log(`graph[${i}] : `, graph[i]);
}

for (let i = 1; i <= N; i++) {
  if (DFS(i)) {
    count++;
  }
}

// console.log("count", count);

console.log(count);

function DFS(x) {
  if (check[x] === true) {
    return false;
  }

  check[x] = true;

  for (let i = 0; i < graph[x].length; i++) {
    const y = graph[x][i];

    if (check[y] === false) {
      DFS(y);
    }
  }

  return true;
}

// 문제 접근 방식

// 연결 요소 찾기 문제에서 연결 요소란 쉽게 생각하면 전체 간선을 이용해서
// 만들 수 있는 한붓 그리기이다.

// 만들 수 있는 한붓 그리기의 총 갯수를 찾기 위해서
// 각 정점과 연결된 정점을 graph에 2차원 배열 형태로 저장하고
// 첫번째 정점(1번 정점)부터 마지막 정점(N번 정점)까지
// 모든 정점에 대해 DFS를 수행한다.

// DFS를 수행하는 과정에서
// 만약 1번 ~ N번 사이에 있는 특정 정점 중에서
// check값이 true로 되어 있는 정점이 있다면
// 그 정점은 다른 정점이 이미 DFS를 수행하는 과정(한붓그리기를 하는 과정)에서
// 방문했던 정점이라는 것이고,
// 이 경우 해당 정점으로 새로운 연결 요소를 만들 수 없으므로
// false를 리턴한다.

// 반대로 1번 ~ N번 사이에 있는 특정 정점 중에서
// check값이 false로 되어 있는 정점이 있다면
// 해당 정점은 다른 한붓그리기에 포함된 적이 없으므로
// DFS를 수행하고 true를 리턴한다.

// 이렇게 각 정점은 본인이 DFS를 수행할 수 있는지 없는지를
// check를 통해 확인하고
// DFS를 수행할 수 있다면
// 본인의 DFS 과정에서 연결된 모든 정점을 check = true로 변경해서
// 그 정점이 다른 한붓그리기에 포함되지 않도록 하면 된다.

// 결국 한붓그리기의 총 갯수는
// 첫번째 정점(1번 정점)부터 마지막 정점(N번 정점)까지
// 모든 정점에 대해 DFS를 수행할 때 반환되는 true의 갯수와 같다.
