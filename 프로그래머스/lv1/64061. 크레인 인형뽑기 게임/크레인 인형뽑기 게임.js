function solution(board, moves) {
  var answer = 0;

  let stack = [];

  let cnt = 0;

  for (let i = 0; i < moves.length; i++) {
    let index = moves[i] - 1;

    // index 열에 있는 값 중에 가장 위의 인형을 뽑기
    for (let j = 0; j < board.length; j++) {
      // 해당 열에 인형이 없으면(모든 요소의 값이 0이면, 아무 일도 일어나지 않음)
      // 해당 열에 인형이 있으면
      if (board[j][index] !== 0) {
        // 가장 위에 존재하는 인형을 stack에 넣음
        stack.push(board[j][index]);

        // 뽑은 인형의 위치한 곳의 값을 0으로 바꿈
        board[j][index] = 0;

        // 만약 stack의 가장 최근에 들어간 인형과, 그 전 인형이 같으면
        if (stack[stack.length - 1] === stack[stack.length - 2]) {
          // 둘 다 stack에서 pop하고
          stack.pop();
          stack.pop();

          // pop한 횟수를 cnt에 기록함
          cnt += 2;
        }

        // 한 번 인형 뽑기를 진행했으면 멈추고,
        // 다음 인형 뽑기를 진행하기 위해 break 수행
        break;
      }
    }
  }

  answer = cnt;

  return answer;
}

// 문제 풀이 접근 방식

// 1. 인형 뽑기
// moves 배열에 들어있는 값 i에 대해서
// 2차원 배열의 열의 인덱스가 i-1인 열에 들어 있는 가장 위의 인형을 빼고,

// 2. 뽑은 인형을 stack에 넣기
// 뽑은 인형을 stack에 넣어준 뒤,
// 스택의 가장 마지막에 들어있던 인형과 같으면
// 두 인형을 stack에서 pop한 뒤, pop한 횟수를 기록하는 cnt에 +2를 하고,
// 같지 않으면 1번을 반복해서 진행한다.
