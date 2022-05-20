function solution(tickets) {
  let answer;

  // 각 티켓을 알파벳 순으로 정렬한 배열
  const sortedTickets = [...tickets].sort();

  // 각 티켓의 사용여부를 저장할 배열
  let visited = new Array(tickets.length).fill(0);

  // ICN부터 DFS 시작
  DFS(sortedTickets, "ICN", [], 1);

  // 각 DFS 단계에서 쓰이는 매개변수는 다음을 의미한다.
  // tk : 티켓 정보
  // start : 출발지
  // route : 해당 DFS 까지의 경로
  // depth : DFS 깊이
  function DFS(tk, start, route, depth) {
    // route에 출발지를 넣기
    route.push(start);

    // 만약 tk의 갯수 +1만큼 재귀를 호출했다면,
    // 경로를 다 찾았으므로 route를 answer에 저장하고 종료
    if (depth === tk.length + 1) {
      answer = route;
      return true;
    }

    // 모든 티켓에 대해 반복
    for (let i = 0; i < tk.length; i++) {
      // 만약 i번째 티켓을 사용한적이 없고,
      // 만약 i번째 티켓이 출발지가 현재 출발지와 같다면
      if (visited[i] === 0 && tk[i][0] === start) {
        // i번 티켓 사용
        visited[i] = 1;

        // i번 티켓의 목적지인 tk[i][1]로 이동하고,
        // DFS 수행의 결과를 result에 저장
        const result = DFS(tk, tk[i][1], route, depth + 1);

        // result가 true이면
        // 이번 깊이의 DFS 종료
        if (result) {
          return true;
        }

        // result가 false이면 (안쪽의 재귀 과정에서 문제가 발생)
        // 즉, 이번 start로 출발하는 경로는 문제가 있는 경로이므로,
        // 티켓 사용을 취소하고, 경로에서 뺌 (for문으로 만족하는 다른 티켓을 찾음)
        visited[i] = 0;
        route.pop();
      }
    }
    return false;
  }

  return answer;
}

// 후기

// 2시간 동안 문제를 풀다가 테스트케이스 1개 때문에 계속 실패가 떠서 결국 구글링해서 답을 찾았다.
// 코드를 처음부터 너무 어렵게 짜서 충족하지 못하는 테스트케이스를 찾아도 유지보수하기가 힘들었던 것이
// 문제를 풀지 못한 원인인 것 같아서, 앞으로는 자료구조를 최대한 간단하게 만드는데 신경을 써야겠다.

// 문제 풀이 접근 방식

// 위에 정리
