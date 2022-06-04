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
        graph[a][j].cost = min;
        alreadyIn = true;
      }
    }

    for (let j = 0; j < graph[b].length; j++) {
      let roadInfo = graph[b][j];

      if (roadInfo.to === a) {
        let min = Math.min(roadInfo.cost, c);
        graph[b][j].cost = min;
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
