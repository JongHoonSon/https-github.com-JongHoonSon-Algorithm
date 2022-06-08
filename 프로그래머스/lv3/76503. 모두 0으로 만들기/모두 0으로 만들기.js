function solution(a, edges) {
  let tree = new Array(a.length);

  for (let i = 0; i < tree.length; i++) {
    tree[i] = new Array();
  }

  for (let i = 0; i < edges.length; i++) {
    let [a, b] = edges[i];

    tree[a].push(b);
    tree[b].push(a);
  }

  let visited = new Array(a.length).fill(false);

  // stack에 최상단 노드를 넣음
  // 각 값은 [현재 노드를 0으로 만드는 데 쓰이는 비용, 부모 노드의 index] 이다.
  // 현재 노드를 0으로 만드는 데 쓰이는 비용은
  // 자식 노드들을 0으로 만드는데 들었던 비용의 합이 도착하면,
  // 현재 노드의 값과 해당 비용을 합한 후, 그 값을 0으로 만드는 데 드는 비용이다.
  // (주석코드만으로 이해가 어려우면 문제 설명 다시 읽어보기)
  let stack = [[0, -1]];

  // BigNum을 사용하기 위해 n을 붙힘 (BigNum 관련 테케 1개가 존재함)
  let answer = 0n;

  // 만약 stack의
  while (stack.length > 0) {
    // stack의 맨 위에서 1개를 꺼냄
    const [start, parent] = stack.pop();

    // 만약 start를 방문한 적이 있다면
    // ()=> 재귀함수가 종료되는 경우랑 마찬가지)
    if (visited[start] === true) {
      // 부모 노드에 자신의 값을 누적함
      a[parent] += a[start];

      // answer에 현재 내가 사용한 가중치를 0으로 만드는데 사용한 횟수를 누적함
      // ex) a[start]의 값이 -5 였다면 +1를 5번 사용해야하므로 => 5
      // ex) a[start]의 값이 3 였다면 -1를 3번 사용해야하므로 => 3
      // n을 0으로 만들려면 n이 양수건 음수건 n번 -1 또는 +1를 써야함
      answer += BigInt(Math.abs(a[start]));
      continue;
    }

    // start를 방문한 적이 없다면
    // stack에 넣고 (재귀 호출하는 것과 마찬가지)
    // 방문 처리함
    stack.push([start, parent]);
    visited[start] = true;

    // start 노드의 인접 노드를 하나씩 확인
    for (let i = 0; i < tree[start].length; i++) {
      let y = tree[start][i];

      // 인접 노드 중에 방문하지 않는 노드가 있다면, 해당 노드를 방문
      if (visited[y] === false) {
        stack.push([y, start]);
      }
    }
  }

  // 모든 수의 누적 결과인 a[0]가 0이면
  // 모두 0으로 만들 수 있으므로 answer 리턴
  // 0이 아니면 모두 0으로 만들 수 없으므로 -1 리턴
  return a[0] === 0 ? answer : -1;
}

// 후기

// 어느정도 구현을 했지만, JS에서는 재귀호출의 가능 횟수가 다른 언어에 비해 작아서
// 런타임 오류 (최대 재귀호출 횟수 초과)가 발생한다.
// 따라서 로직자체는 풀 수 있는 로직을 구현했지만,
// JS의 특성 상 더 효율적인 코드로 풀어야하고, 구글링을 통해 Iterative DFS로 푼 방식을 찾았다.

// 문제 풀이 접근 방식

// 이 문제를 풀기 위해서는 트리에서 DFS를 통해 리프노드를 찾고,
// 리프노드부터 최상단 노드까지 재귀호출을 종료하며 리턴 값으로
// 본인 노드의 값을 0으로 만드는데 필요한 값을 전달하면 된다.

// Iterative DFS 는, DFS를 수행하지만 재귀함수 방식이 아닌 stack 방식으로 동작하기 때문에
// 최대 재귀호출 횟수 초과 에러가 발생하지 않는다.
// 구현 방법은 주석코드로 설명하였다.
