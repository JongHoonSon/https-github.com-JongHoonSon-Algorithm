function solution(arr1, arr2) {
  var answer = [[]];

  let arr3 = new Array(arr1.length);

  for (let i = 0; i < arr1.length; i++) {
    arr3[i] = new Array(arr2[0].length).fill(0);
  }

  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2[0].length; j++) {
      console.log(`i j : `, i, j);

      for (let k = 0; k < arr1[0].length; k++) {
        arr3[i][j] = arr3[i][j] + arr1[i][k] * arr2[k][j];
      }
    }
  }

  answer = arr3;

  return answer;
}
