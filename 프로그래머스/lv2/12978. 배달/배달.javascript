function solution(N, road, K) {
  var answer = 0;

  let visited = new Array(N + 1).fill(false);

  let graph = new Array(N + 1);

  for (let i = 0; i < graph.length; i++) {
    graph[i] = new Array();
  }

  for (let i = 0; i < road.length; i++) {
    let [a, b, c] = road[i];

    let alreadyIn = false;

    for (let j = 0; j < graph[a].length; j++) {
      let roadInfo = graph[a][j];

      if (roadInfo.to === b) {
        let min = Math.min(roadInfo.cost, c);
        roadInfo.cost = min;
        alreadyIn = true;
      }
    }

    for (let j = 0; j < graph[b].length; j++) {
      let roadInfo = graph[b][j];

      if (roadInfo.to === a) {
        let min = Math.min(roadInfo.cost, c);
        roadInfo.cost = min;
        alreadyIn = true;
      }
    }

    if (alreadyIn === false) {
      graph[a].push({ to: b, cost: c });
      graph[b].push({ to: a, cost: c });
    }
  }

  let costSet = new Set();

  DFS(1, 0);

  function DFS(x, cost) {
    visited[x] = true;
    costSet.add(x);

    for (let i = 0; i < graph[x].length; i++) {
      let roadInfo = graph[x][i];

      if (visited[roadInfo.to] === false && cost + roadInfo.cost <= K) {
        DFS(roadInfo.to, cost + roadInfo.cost);
      }
    }
    visited[x] = false;
  }

  console.log(costSet);

  answer = costSet.size;

  return answer;
}

// 문제 풀이 접근 방식

// 문제에서 주어지는 road 정보를 2차원 배열인 graph 상에 저장하고,
// DFS 수행하면서 각 마을까지 이동하였을 때 드는 비용을 계산하고,
// 해당 비용이 문제에서 주어지는 K 보다 같거나 작은 경우에만
// 방문한 마을을 Set에 저장한다.
// 최종적으로 Set을 출력하면 된다.

// 문제를 푸는데 주의할 점은 아래와 같다.

// 1. 마을 A와 마을 B를 잇는 경로가 여러개 있을 수 있다.
// 이 문제에서는 경로의 수를 찾는 것이 아니라,
// 최솟값으로 이동하면서 어디까지 갈 수 있는지를 찾는 것이므로
// 이미 마을 A와 마을 B를 잇는 경로를 저장한 적이 있다면,
// 새로운 경로와 기존 경로 중에서 cost가 더 낮은 경로로 덮어 씌운다.

// 2. DFS가 아닌 BFS로 진행하여도 상관없다. (오히려 더 간편하다.)
// 처음에는 BFS로는 풀 수 없는 문제라고 생각하였지만, BFS로도 풀 수 있는 문제이다.

// BFS 역시 큐에 방문할 장소를 넣는 과정에서
// 해당 장소로 이동할 경우의 누적 비용을 같이 저장하고,

// 다음 방문 장소를 찾는 과정에서
// 다음 방문지로 가는 비용과 현재까지의 누적 비용의 합이
// 문제에서 주어진 K보다 클 경우, 방문을 하지 않으면 된다.(= 큐에 넣지 않는다.)

// 이렇게 하면, 큐에는 K값 이하로 방문할 수 있는 모든 경로가 들어가며,
// 각 경로의 마을을 Set으로 넣으면 방문할 수 있는 마을의 갯수를 구할 수 있다.

// 후기

// 객체 배열을 이용하는 방식이 능숙하지 않은 것 같다.

// 객체의 값을 참조할 때는