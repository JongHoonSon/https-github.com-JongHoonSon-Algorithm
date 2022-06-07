function solution(n) {
  var answer = [];

  // 삼각 달팽이 조건대로 값을 넣을 2차원 배열 arr
  let arr = new Array(n);

  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array();
  }

  // 현재 단계에서 넣어야하는 수의 갯수
  let moveLength = n;

  // 행렬값, ++row로 시작하기 위해 row는 -1로 초기화
  let col = 0;
  let row = -1;

  // 넣을 수, 1씩 증가
  let num = 1;

  // 현재 단계에서 넣어야하는 수가 0개이면 종료
  while (moveLength > 0) {
    // 1. 위에서 왼쪽 아래로
    for (let i = 0; i < moveLength; i++) {
      arr[++row][col] = num++;
    }

    moveLength--;

    // 2. 맨 아랫줄 채우기
    for (let i = 0; i < moveLength; i++) {
      arr[row][++col] = num++;
    }

    moveLength--;

    // 3. 오른쪽 아래에서 위로
    for (let i = 0; i < moveLength; i++) {
      arr[--row][--col] = num++;
    }

    moveLength--;
  }

  // 2차원 배열 arr의 각 요소를 answer에 넣음
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      answer.push(arr[i][j]);
    }
  }

  return answer;
}

// 문제 풀이 접근 방식

// 행, 열 값을 변수로 가지면서
// 문제에서 요구하는 방향대로 값을 넣으면 된다.
