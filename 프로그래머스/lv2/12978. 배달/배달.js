function solution(N, road, K) {
  var answer = 0;

  // 특정 마을을 방문한적이 있는지 저장할 변수
  let visited = new Array(N + 1).fill(false);

  // 주어진 road 정보를 저장할 graph 2차원 배열
  let graph = new Array(N + 1);

  for (let i = 0; i < graph.length; i++) {
    graph[i] = new Array();
  }

  // road 배열에 들어있는 road 정보를 하나씩 확인하면서
  // graph 배열에 객체 형태로 넣음
  for (let i = 0; i < road.length; i++) {
    let [a, b, c] = road[i];

    // a : 마을 A
    // b : 마을 B
    // c : 가격

    let alreadyIn = false;

    // 마을 A과 이어진 경로를 하나씩 확인
    for (let j = 0; j < graph[a].length; j++) {
      // 마을 A로 이어진 경로 roadInfo에 저장
      let roadInfo = graph[a][j];

      // 만약 roadInfo의 목적지가 마을 B라면,
      if (roadInfo.to === b) {
        // 현재 경로와 기존 경로 중 작은 값을 저장함
        let min = Math.min(roadInfo.cost, c);
        roadInfo.cost = min;
        alreadyIn = true;
      }
    }

    // 마을 B과 이어진 경로를 하나씩 확인
    for (let j = 0; j < graph[b].length; j++) {
      // 마을 B로 이어진 경로 roadInfo에 저장
      let roadInfo = graph[b][j];

      // 만약 roadInfo의 목적지가 마을 A라면,
      if (roadInfo.to === a) {
        // 현재 경로와 기존 경로 중 작은 값을 저장함
        let min = Math.min(roadInfo.cost, c);
        roadInfo.cost = min;
        alreadyIn = true;
      }
    }

    // 만약 마을 A에서 마을 B로 가는 경로가 없다면,
    // 현재 받은 정보로 새로 추가함
    if (alreadyIn === false) {
      graph[a].push({ to: b, cost: c });
      graph[b].push({ to: a, cost: c });
    }
  }

  let visitedTown = new Set();

  // 1번 마을부터 수행 (문제 조건)
  DFS(1, 0);

  function DFS(x, cost) {
    // 방문처리
    visited[x] = true;

    // 방문한 마을에 등록
    visitedTown.add(x);

    // 현재 방문한 x와 인접한 곳을 하나씩 확인
    for (let i = 0; i < graph[x].length; i++) {
      let roadInfo = graph[x][i];

      // 만약 해당 마을을 방문한적이 없고,
      // 해당 마을로 이동하는 비용과 현재까지 누적 비용의 합이 K보다 같거나 적으면
      if (visited[roadInfo.to] === false && cost + roadInfo.cost <= K) {
        // 해당 마을로 이동 (DFS 수행)
        DFS(roadInfo.to, cost + roadInfo.cost);
      }
    }

    // 방문을 끝낸 경우 false 처리
    visited[x] = false;
  }

  console.log(visitedTown);

  // 방문한 마을의 갯수를 answer에 저장 후 출력
  answer = visitedTown.size;

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

// 2. BFS가 아닌 DFS로 풀어야하는 이유

// DFS는 visited로 방문한 곳을 true 처리하면서 들어갈 수 있는데까지 들어가보고,
// 나오면서 기존에 방문한 곳을 false 처리하면서 나온다.
// 이는 DFS가 탐색하는 동안 직진과 후진을 적절히 섞어 쓴다는 것을 의미한다.

// 예를 들어 DFS는 '1 -> 2 -> 3' 순서로 들어갔다가 3에서 더 이상 진입이 불가능할 경우
// '2 <- 3'로 나오면서, visited[3] 을 false 처리하기 때문에
// 추후에 '1 -> 4 -> 3' 같이 기존에 방문한 이력이 있었던 3을 포함한 새로운 경로에 대한 탐색 가능 여부를 판단할 때,
// visited[3] 값이 false 이므로 해당 경로로 추가적인 탐색을 수행할 수 있다.
// 즉, DFS는 후진을 할 수 있기 때문에, 3을 한 번 방문하였다가 다시 방문하지 않은 것으로 처리할 수 있다.

// 반면에 BFS는 willVisit으로 방문할 예정인 곳을 true처리하면서 탐색하지만,
// DFS처럼 이후 다시 되돌아 나오지 않는다.
// 이는 BFS가 탐색하는 동안 오직 직진만 사용한다는 것을 의미한다.

// 예를 들어 '1 -> 2 -> 3' 인 경로가 있었고,
// '1 -> 4 -> 2' 라는 경로가 있었다면,
// '1 -> 4 -> 2' 에서 2를 방문하려고 할 때, 이미 2는 '1 -> 2 -> 3'에 의해 방문되었으므로,
// '1 -> 4 -> 2' 의 경로를 사용할 수 없다.
// 이러한 특성으로 인해 BFS가 최단 거리를 구하는 문제에서 사용된다.

// 후기

// 객체 배열을 이용하는 방식이 능숙하지 않은 것 같아서 연습이 더 필요하다.

// + 객체 배열에서 특정 객체를 변수에 저장한 경우,
// 해당 변수 값을 변경하면 배열에 들어있는 원본 객체의 값이 바뀐다.

// ex) let arr = new Array()
//     arr.push({a:5, b:3})
//     let A = arr[0]
//     A.a = 0;
//     console.log(arr[0]) => {a:0, b:3};

// 그래도 좀 더 명확하게 하려면 arr[1]의 값을 바꿔주는게 나을 것 같다.
