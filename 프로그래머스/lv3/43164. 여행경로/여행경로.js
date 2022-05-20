function solution(tickets) {
  let answer;

  const arr = [...tickets].sort();
  let visit = new Array(tickets.length).fill(0);

  dfs(arr, "ICN", [], 0);

  function dfs(tickets, start, res, cnt) {
    res.push(start);

    if (cnt === tickets.length) {
      answer = res;
      return true;
    }

    for (let i = 0; i < tickets.length; i++) {
      if (visit[i] === 0 && tickets[i][0] === start) {
        visit[i] = 1;

        const result = dfs(tickets, tickets[i][1], res, cnt + 1);

        if (result) return true;

        visit[i] = 0;
        res.pop();
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
