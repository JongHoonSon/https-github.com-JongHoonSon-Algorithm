function solution(n, computers) {
  var answer = 0;

  let visited = new Array(computers.length).fill(false);

  for (let i = 0; i < computers.length; i++) {
    // 모든 점에 대해 DFS를 수행하여 결과가 true가 나오면
    // 해당 점을 시작으로 하는 연결 요소를 찾을 수 있다는 뜻이므로
    // answer을 ++ 해준다.
    if (DFS(i) === true) {
      answer++;
    }
  }

  function DFS(x) {
    if (visited[x] === true) {
      return false;
    }

    visited[x] = true;

    // x : 현재 DFS 상에서 탐색 중인 점
    // j : 그래프 상에 존재하는 각 점 (모든 점에 대해 하나씩 반복)
    for (let j = 0; j < computers[x].length; j++) {
      // 밑의 3가지 경우에는 탐색 조건에 맞지 않으므로, continue를 수행한다.

      // 점 j가 점 x와 같다면 (= 본인이라면)
      if (j === x) {
        continue;
      }

      // 점 j를 방문한적이 있다면 (= 이미 연결 요소로 쓰인적이 있으면)
      if (visited[j] === true) {
        continue;
      }

      const y = computers[x][j];

      // 점 j와 점 x가 연결되어 있지 않으면
      if (y === 0) {
        continue;
      }

      // 위의 탐색 종료 조건을 모두 통과한 경우
      // 해당 점 j는 점 x와 연결되어 있고, 방문한 적이 없는 점이므로
      // DFS로 방문함
      DFS(j);
    }

    // DFS를 한번이라도 수행했으면
    // 최소 길이가 1인 연결 요소이므로 true 리턴
    return true;
  }

  return answer;
}

// 문제 풀이 접근 방식

// 문제에서 주어진 그래프 정보를 바탕으로 DFS를 수행하여
// 연결 요소의 갯수를 구하는 문제이다.

// 하나 주의할 점은 점 A와 연결된 점만 그래프로 주어지는 것이 아니라
// 점 A와 모든 점에 연결관계가 그래프에 담겨 있으므로, 다음 몇가지를 추가적으로 더 확인해야한다.

// 1. 점 A에서 DFS를 수행할 때 본인은 제외해야한다. (j === y)
// 2. 해당 점과 연결되어 있는지 판단해야한다. (0 또는 1)
