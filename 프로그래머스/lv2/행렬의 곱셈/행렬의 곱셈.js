function solution(arr1, arr2) {
  var answer = [[]];

  // 곱셈의 결과를 저장할 arr3을 만든다.
  // 두 행렬의 곱셈의 결과의 크기는 첫번째 행렬의 행 길이 x 두번째 행렬의 열 길이 이다.
  let arr3 = new Array(arr1.length);

  for (let i = 0; i < arr1.length; i++) {
    arr3[i] = new Array(arr2[0].length).fill(0);
  }

  // arr3의 (i,j)에 값을 채우는 과정
  // i : 첫번째 행렬의 행 값
  // j : 두번째 행렬의 열 값
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2[0].length; j++) {
      console.log(`i j : `, i, j);

      // k : 첫번째 행렬의 각 행(i)에서의 각 열
      for (let k = 0; k < arr1[0].length; k++) {
        // k를 첫번째 행렬 arr1은 열의 값으로 쓰고 arr[i][k]
        // 두번째 행렬 arr2은 행의 값으로 씀 arr[k][j]
        arr3[i][j] = arr3[i][j] + arr1[i][k] * arr2[k][j];
      }
    }
  }

  // 계산 결과를 answer에 저장
  answer = arr3;

  return answer;
}
