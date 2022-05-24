function solution(land) {
  var answer = 0;

  // 행의 크기를 저장한 row 변수
  let row = land.length;

  // 열의 크기를 저장한 col 변수
  let col = 4;

  // d는 기존의 land 배열의 값을 누적할 메모이제이션 테이블
  let d = new Array(row);
  for (let i = 0; i < row; i++) {
    d[i] = new Array(col);
  }

  // 첫번째 행의 값에 land의 값을 저장함
  for (let i = 0; i < col; i++) {
    d[0][i] = land[0][i];
  }

  // 두번째 행부터는 상향식으로 계산함
  for (let i = 1; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let max = 0;
      for (let k = 0; k < col; k++) {
        // 이전 행 중에서 열이 같은 요소면 넘어감
        if (j === k) {
          continue;
        }

        // 이전 행 중에서 열이 같지 않은 요소면 계산 수행
        if (max < d[i - 1][k]) {
          // 이전 행 중에서 열이 같지 않은 요소 중 최댓값을 max에 기록
          max = d[i - 1][k];
        }
      }

      // 결국 d[i][j]는 land[i][j]의 값과,
      // 이전 행에서 열이 같이 않은 요소 중에서의 최댓값인 max의 합임
      d[i][j] = land[i][j] + max;
    }
  }

  console.log(d);

  // 메모이제이션 테이블 d의 마지막 행의 각 열 중에서 최댓값을 출력
  answer = Math.max(d[row - 1][0], d[row - 1][1], d[row - 1][2], d[row - 1][3]);

  return answer;
}

// 문제 풀이 접근 방식

// N행 4열 크기의 2차원 배열에 DP를 이용하는 문제이다.
// 문제에서 주어진 N x 4 크기의 2차원 배열 d를 만들고,
// 배열 d의 각 행의 4개의 열에는
// 이전 행의 값 중에서 가장 큰 값과 본인을 합한 값을 저장한다.
// 이때 문제에서 주어진 조건대로 이전 행 중에서 본인의 열이 같은 곳의 값은
// 사용하지 않는다.
// 문제에서 주어진 조건에 유의해서
// 상향식 방식으로 구현하면 쉽게 해결할 수 있다.
