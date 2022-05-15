function solution(n, results) {
  var answer = 0;

  // 각 선수가 다른 선수와의 경기에서 이길 수 있는지를 저장하는 2차원 배열
  let canWin = new Array(n + 1);

  // 일단 false로 초기화함
  for (let i = 1; i <= n; i++) {
    canWin[i] = new Array(n + 1).fill(false);
  }

  // results의 정보에 따라 a가 b를 이길 수 있다는 것을
  // canWin[a][b] = true로 처리함
  results.forEach(([a, b]) => {
    canWin[a][b] = true;
  });

  // 3중 반복문을 통해
  // 선수들을 3명씩 모든 경우의수에 대해 전적 비교함
  for (var i = 1; i <= n; i++) {
    for (var j = 1; j <= n; j++) {
      for (var k = 1; k <= n; k++) {
        // j가 i를 이겼고,
        // i가 k를 이겼다면
        // (= 실력이 j > i > k 순)
        if (canWin[j][i] && canWin[i][k]) {
          // j는 k가 이길 수 있음
          // (각 선수의 능력치가 고정됨)
          canWin[j][k] = true;
        }
      }
    }
  }

  for (let i = 1; i <= n; i++) {
    let cnt = 0;
    for (let j = 1; j <= n; j++) {
      if (canWin[i][j] || canWin[j][i]) {
        cnt++;
      }
    }
    if (cnt === n - 1) {
      answer++;
    }
  }
  return answer;
}
