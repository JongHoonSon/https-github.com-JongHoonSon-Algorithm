function solution(rows, columns, queries) {
  var answer = [];

  // 주어진 행과 열의 길이로 2차원 배열 만들기
  let arr = new Array(rows);

  // 2차원 배열의 원소에 들어갈 num 값 (1씩 증가)
  let num = 1;

  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array();
    for (let j = 0; j < columns; j++) {
      arr[i].push(num++);
    }
  }

  // 테두리를 회전할 정보가 들어있는 queries 배열의
  // 각 원소 값을 저장함
  for (let i = 0; i < queries.length; i++) {
    let [x1, y1, x2, y2] = queries[i];

    // 회전할 정보대로 회전 시킨 후의 결과를 저장
    let [resultArr, minValue] = rotation(arr, x1 - 1, y1 - 1, x2 - 1, y2 - 1);

    // 회전한 결과를 arr에 다시 저장
    arr = resultArr;

    // 회전 시 사용된 원소의 값 중에 가장 작은 값을 answer에 push함
    answer.push(minValue);
  }

  return answer;
}

function rotation(arr, x1, y1, x2, y2) {
  // 직사각형 테두리에서

  // 맨 왼쪽 윗 칸의 값을 저장함 (덮어 씌워지기 때문에)
  let temp = arr[x1][y1];

  // 왼쪽 변의 요소를 위로 한 칸씩 당김
  for (let i = x1; i <= x2 - 1; i++) {
    arr[i][y1] = arr[i + 1][y1];
  }

  // 밑 변의 요소를 왼쪽으로 위로 한 칸씩 당김
  for (let i = y1; i <= y2 - 1; i++) {
    arr[x2][i] = arr[x2][i + 1];
  }

  // 오른쪽 변의 요소를 아래로 한 칸씩 당김
  for (let i = x2; i >= x1 + 1; i--) {
    arr[i][y2] = arr[i - 1][y2];
  }

  // 윗 변의 요소를 오른쪽으로 한 칸씩 당김
  for (let i = y2; i >= y1 + 2; i--) {
    arr[x1][i] = arr[x1][i - 1];
  }

  // 저장해놨던 맨 왼쪽 윗 칸의 값(temp)을 바로 그 오른쪽에 넣음
  arr[x1][y1 + 1] = temp;

  // *행렬 테두리 회전 완료*

  // 행렬 테두리 회전 시 사용된 원소들 중에서 가장 작은 값을 찾음

  let elementArr = [];

  for (let i = x1; i <= x2; i++) {
    elementArr.push(arr[i][y1]);
  }

  for (let i = x1; i <= x2; i++) {
    elementArr.push(arr[i][y2]);
  }

  for (let i = y1 + 1; i <= y2 - 1; i++) {
    elementArr.push(arr[x1][i]);
  }

  for (let i = y1 + 1; i <= y2 - 1; i++) {
    elementArr.push(arr[x2][i]);
  }

  let minValue = Math.min(...elementArr);

  // 행렬 테두리를 회전한 2차원 배열과 최솟값 리턴
  return [arr, minValue];
}

// 문제에서 주어진 row와 column 값으로 2차원 배열을 만든 후,
// 주어진 크기의 직사각형을 회전시키고 회전 시킨 원소 중에서 최솟값을 리턴하는
// rotation 함수를 만들어 queries에 들어있는 각 요청대로 회전시키면 된다.
