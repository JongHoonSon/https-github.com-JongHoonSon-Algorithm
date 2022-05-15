function solution(n, computers) {
  var answer = 0;

  let visited = new Array(computers.length).fill(false);

  for (let i = 0; i < computers.length; i++) {
    if (DFS(i) === true) {
      answer++;
    }
  }

  function DFS(x) {
    if (visited[x] === true) {
      return false;
    }

    visited[x] = true;

    for (let j = 0; j < computers[x].length; j++) {
      if (j === x) {
        continue;
      }

      if (visited[j] === true) {
        continue;
      }

      const y = computers[x][j];

      if (y === 0) {
        continue;
      }

      if (y === 1) {
        DFS(j);
      }
    }

    return true;
  }

  return answer;
}
