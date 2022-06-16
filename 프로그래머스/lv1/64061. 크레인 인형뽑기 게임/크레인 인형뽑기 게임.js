function solution(board, moves) {
  var answer = 0;

  let stack = [];

  let cnt = 0;

  for (let i = 0; i < moves.length; i++) {
    let index = moves[i] - 1;

    for (let j = 0; j < board.length; j++) {
      if (board[j][index] !== 0) {
        stack.push(board[j][index]);
        board[j][index] = 0;

        if (stack[stack.length - 1] === stack[stack.length - 2]) {
          stack.pop();
          stack.pop();
          cnt += 2;
        }
        break;
      }
    }
  }

  answer = cnt;

  return answer;
}
