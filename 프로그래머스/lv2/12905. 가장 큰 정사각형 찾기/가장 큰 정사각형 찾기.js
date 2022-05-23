function solution(board) {
  var answer = 1234;

  // 만약 board의 크기가 1x1 이라면
  if (board.length === 1 && board[0].length === 1) {
    // 1x1 보드의 값이 1이면
    if (board[0][0] === 1) {
      // 정사각형의 넓이 : 1
      return 1;

      // 1x1 보드의 값이 0이면
    } else {
      return 0;
    }
  }

  // DP 수행
  let max = 0;
  // n x m 크기의 board의 (1, 1) 부터 (n-1, m-1) 까지 반복 (끝까지)
  for (let i = 1; i < board.length; i++) {
    for (let j = 1; j < board[0].length; j++) {
      // 만약 (i, j) 좌표의 값이 1이면 (= 본인을 포함하는 가장 큰 정사각형을 계산할 수 있음)
      if (board[i][j] === 1) {
        // 왼쪽 위, 위, 왼쪽 중에서 가장 작은 값을 구함 (주변에 붙은 사각형들의 크기)
        let min = Math.min(
          board[i - 1][j - 1],
          board[i - 1][j],
          board[i][j - 1]
        );

        // (i, j) 좌표를 포함하는 가장 큰 정사각형은 주변에서 찾을 수 있는 가장 작은 정사각형의 크기 + 1임

        // ex1) 1   1
        //      1 (i,j)
        // 위와 같고, (i, j)가 1이라면, (i, j)의 값을 주변 좌표들의 min 값인 1에 +1을 한 2로 변경함

        // ex1) 2   2
        //      1 (i,j)
        // 위와 같고, (i, j)가 1이라면, (i, j)의 값을 주변 좌표들의 min 값인 1에 +1을 한 2로 변경함

        board[i][j] = min + 1;
        if (board[i][j] > max) {
          // max 값은 (i, j)를 포함하는 정사각형을 구하는 매 과정에서 가장 큰 값을 기록함
          max = board[i][j];
        }
      }
    }
  }

  // max는 정사각형의 한 변의 길이이기 때문에
  // 문제에서 요구하는 정사각형의 넓이를 구하기 위해 max를 제곱함
  answer = max * max;

  return answer;
}

// 문제 풀이 접근 방식

// DP를 이용해서 각 좌표를 포함하여 만들 수 있는 가장 큰 정사각형을 찾고,
// 그 과정에서 가장 큰 정사각형을 저장해놓았다가, 해당 정사각형의 넓이를 출력하면 된다.
