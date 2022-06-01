function solution(n, wires) {
  var answer = -1;

  // 주어진 간선 정보를 바탕으로 graph를 생성
  let graph = new Array(n + 1);

  for (let i = 1; i <= n; i++) {
    graph[i] = new Array(n + 1).fill(false);
  }

  // 간선의 연결 여부를 매번 조정해야 하므로

  // 노드 A와 노드 B를 잇는 간선을
  // graph[노드 A] 에 B를 push 하고,
  // graph[노드 B] 에 A를 push 하는 방식이 아닌

  // grpah[노드 A][노드 B]의 값을 true로 하고,
  // grpah[노드 B][노드 A]의 값을 true로 하는 방식을 사용한다.

  // 노드 A와 노드 B를 잇는 간선을 연결되지 않은 것처럼 하려면
  // grpah[노드 A][노드 B]의 값을 false로 변경하고,
  // grpah[노드 B][노드 A]의 값을 false로 변경하면 된다.
  for (let i = 0; i < wires.length; i++) {
    let [from, to] = wires[i];

    graph[from][to] = true;
    graph[to][from] = true;
  }

  for (let i = 1; i <= n; i++) {
    console.log(graph[i]);
  }

  // DFS 수행 시에 특정 노드의 방문 여부를 처리할 배열
  let visited;

  // DFS로 방문한 노드의 수를 저장할 변수
  let cnt;

  // DFS의 결과를 저장하는 변수
  let result;

  // DFS 수행 결과, 두 연결 그래프의 노드 수의 차이 중에서
  // 가장 작은 차이를 저장하는 변수
  let minGap = Infinity;

  // 모든 간선에 대해서 반복하며, 간선 하나씩을 끊는다.
  for (let i = 0; i < wires.length; i++) {
    // 이번에 끊을 간선
    let [from, to] = wires[i];

    // 간선을 끊음.
    graph[from][to] = false;
    graph[to][from] = false;

    visited = new Array(n + 1).fill(false);
    let results = new Array();

    // 1개의 간선이 끊긴 graph로 DFS 수행
    // graph 상의 각 노드 j를 시작점으로 함
    for (let j = 1; j <= n; j++) {
      // DFS를 1번 수행할 때 방문한 노드의 수를 cnt에 저장함
      cnt = 0;

      // DFS의 결과 저장
      result = DFS(j);

      // 만약 DFS 결과가 false 라면,
      // 이번 DFS의 시작점인 노드 j가 이미 이전에 수행한 DFS에서 방문되었다는 것을 뜻함.
      // 따라서 이번 DFS의 시작점인 노드 j로는 DFS를 수행할 수 없기 때문에
      // DFS의 시작점을 다음번 노드로 변경한 후, 다시 DFS를 시도하기 위해 continue로 넘어감
      if (result === false) {
        continue;
      }

      // 노드 j를 시작점으로 하는 DFS를 수행할 수 있었다면, (위의 조건에 걸리지 않은 경우)
      // 방문한 노드의 수 cnt를 results에 넣음
      results.push(cnt);
    }

    // 위의 과정으로 인해
    // results는 2번의 DFS 과정에서 각각 구한 방문한 노드의 수인 cnt가 1번씩 push되었다.
    // (graph가 2개의 연결 그래프로 이루어졌으므로, DFS가 2번 진행됨)
    // minGap은 2번의 DFS 과정에서 각각 구한 방문한 노드의 수인 cnt의 차이 중 가장 적은 차이 값으로 갱신한다.
    minGap = Math.min(Math.abs(results[0] - results[1]), minGap);

    // 간선을 다시 연결해놓음 (매번 간선을 1개씩만 끊을 것이므로)
    graph[from][to] = true;
    graph[to][from] = true;
  }

  function DFS(x) {
    // 노드 x를 이미 방문한 적이 있다면, DFS를 수행할 수 없으므로 false를 리턴함
    if (visited[x] === true) {
      return false;
    }

    // 노드 x를 방문한 적이 없다면,
    // 노드 x를 탐색함
    visited[x] = true;
    cnt++;

    // 노드 x와 연결된 노드를 모두 탐색함
    for (let i = 1; i <= n; i++) {
      if (graph[x][i] === true && visited[i] === false) {
        DFS(i);
      }
    }

    // 노드 x로 시작하는 DFS를 수행했으므로 true를 리턴함
    return true;
  }

  answer = minGap;

  return answer;
}

// 문제 풀이 접근 방식

// 먼저 문제에서 주어진 트리의 간선 정보를 바탕으로
// 각 간선 끼리의 연결 여부를 graph에 2차원 배열 형태로 저장한다.

// 그 이후, 트리는 모든 노드들이 연결되어 있다는 점을 착안해서
// 모든 간선에 대해 각 각선을 한번씩 연결을 끊은 것처럼 graph를 변경한 후,
// 변경된 graph에 대해 DFS를 수행하면 총 2번의 DFS를 진행할 수 있다.
// (하나의 간선을 끊으면, 전체 노드에 대해서 연결 그래프가 2개가 되기 때문)

// DFS를 한 번 수행할 때 마다 방문한 노드의 갯수를 저장하여,
// 총 2번 DFS를 수행하는 과정에서 각 DFS에서 바꾼 노드의 갯수를 비교한다.
// 그 중 두 갯수의 차이가 가장 적은 경우의 차잇값을 저장하고,
// 최종적으로 가장 적은 차잇값을 출력하면 된다.

// 요약

// 트리 형태의 그래프에서 특정 간선을 끊은 후에,
// 나눠진 두개의 연결 그래프에 대해서
// 각 연결 그래프의 노드 수의 차이가 가장 적은 경우의
// 노드 수 차이를 출력하게 된다.
