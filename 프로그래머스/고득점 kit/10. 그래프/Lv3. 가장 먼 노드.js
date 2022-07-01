function solution(n, edge) {
  var answer = 0;

  // 입력으로 주어지는 간선의 정보를 바탕으로 grpah 구성
  let graph = new Array(n + 1);

  for (let i = 1; i <= n; i++) {
    graph[i] = new Array();
  }

  for (let i = 0; i < edge.length; i++) {
    const [a, b] = edge[i];

    // console.log("a, b : ", a, b);

    graph[a].push(b);
    graph[b].push(a);
  }

  for (let i = 1; i <= n; i++) {
    // console.log(`graph[${i}]`, graph[i]);
  }

  // 방문 예약 여부를 기록하기 위한 배열
  let willVisit = new Array(n + 1).fill(false);

  // 1번 노드부터의 거리를 저장할 배열
  let dist = new Array(n + 1).fill(0);

  // 0번 인덱스의 값을 null로 변경함 (큰 의미 없음)
  dist[0] = null;

  // BFS의 수행 횟수 (= 특정 노드까지의 거리)
  let times = 1;

  // 1번 노드부터  BFS 시작
  BFS(1);

  function BFS(startNode) {
    let queue = new Array();
    queue.push(startNode);
    willVisit[startNode] = true;

    let idx = 0;
    let startIndex;
    let lastIndex;

    while (queue.length !== idx) {
      startIndex = idx;
      lastIndex = queue.length - 1;

      for (let i = startIndex; i <= lastIndex; i++) {
        const x = queue[i];
        idx++;

        for (let j = 0; j < graph[x].length; j++) {
          const y = graph[x][j];

          if (willVisit[y] === true) {
            continue;
          }

          // x번 노드와 인접한 y번 노드에 접근할 수 있다면
          queue.push(y);
          willVisit[y] = true;

          // y번 노드까지의 거리(=BFS 수행횟수)인 times를 dist[y]에 저장
          dist[y] = times;
        }
      }

      times++;
    }
  }

  // console.log("dist : ", dist);

  // 가장 먼 거리를 max에 저장
  let max = Math.max(...dist);

  let maxCount = 0;

  // 거리가 max인 노드의 수를 maxCount에 카운트함
  dist.forEach((el) => {
    if (el === max) {
      maxCount++;
    }
  });

  // answer에 maxCount를 저장함
  answer = maxCount;

  //   console.log("max : ", max);

  // 마지막으로 answer 출력
  return answer;
}

// 문제 풀이 접근 방식

// 전형적인 BFS를 이용하는 유형으로,
// 입력으로 주어지는 간선의 정보로 graph 배열을 구성하고,
// 1번 노드부터 BFS 시작하여, 각 노드까지의 거리를 기록하고
// 가장 긴 거리를 갖는 노드의 수를 출력하면 된다.
