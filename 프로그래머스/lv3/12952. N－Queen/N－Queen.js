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
      // 1. 같은 열에 이미 퀸이 존재하는지 확인

      // row의 위에 있는 i번째 행에 놓은 퀸의 열 값(board[i])과
      // 현재 놓은 퀸의 열 값(board[row])이 일치한다면 false 리턴
      // (= 같은 열에 이미 퀸이 존재하는 상태)
      if (board[i] === board[row]) {
        return false;
      }

      // 2. 대각선 상에 이미 퀸이 존재하는지 확인

      // row의 위에 있는 i번째 행에 놓은 퀸의 열 값(board[i])과
      // 현재 놓은 퀸의 열 값(board[row])의 차이가
      // i번째 행과 현재 행의 차이와 같다면

      // ex) 1 0 0 0
      //     0 1 0 0
      //     0 0 0 0
      //     0 0 0 0

      // 값이 1인 곳에 퀸이 위치한다고 했을 때

      // 열 값
      // board[1] = 1
      // board[2] = 2

      // 행 값
      // i = 1;
      // row = 2;

      // 열 값의 차이 = 행 값의 차이이므로 대각선 상에 이미 퀸이 존재하는 것이므로 false리턴

      if (Math.abs(board[i] - board[row]) === Math.abs(i - row)) {
        return false;
      }
    }

    // 위 두 조건에 걸리지 않은 경우, 놓을 수 있는 경우로, true 리턴
    return true;
  }

  return answer;
}

// 문제 풀이 접근 방식

// BT를 이용해서, DFS를 진행하는 과정에서 다음 차례에 놓을 수 있는 경우인지를 판단하고,
// 놓을 수 있는 경우 다음 BT를 재귀호출하는 방식으로 문제에서 요구하는 답을 구할 수 있다.
