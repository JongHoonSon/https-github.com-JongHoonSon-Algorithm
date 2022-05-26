function solution(n) {
  var answer = 0;

  for (let i = 1; i <= n; i++) {
    const board = new Array(n + 1).fill(0);

    // 첫번째 행의 1열부터 n열까지 퀸을 놓은 경우에 대해
    board[1] = i;

    // 각각 BT 수행
    BT(board, 1);
  }

  function BT(board, row) {
    // row가 n번째까지 왔다면
    // (n-1번째까지 모두 조건을 통과하였다면)
    // n번째도 무조건 통과하므로, answer 추가함
    if (row === n) {
      answer++;
    }

    for (let i = 1; i <= n; i++) {
      // 다음 행에 1부터 n까지 넣어보고
      board[row + 1] = i;

      // 가능한 경우인지 판단
      if (isValid(board, row + 1)) {
        // 가능한 경우, 다음 행에 대한 BT 수행
        BT(board, row + 1);
      }
    }
  }

  function isValid(board, row) {
    for (let i = 1; i < row; i++) {
      if (board[i] === board[row]) {
        return false;
      }
      if (Math.abs(board[i] - board[row]) === Math.abs(i - row)) {
        return false;
      }
    }
    return true;
  }

  return answer;
}
