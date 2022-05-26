function solution(arr) {
  var answer = 0;

  let maxNum = Math.max(...arr);

  console.log(maxNum);

  let i = 2;

  while (true) {
    let nTimesMaxNum = maxNum * i;

    let allPass = true;
    for (let num of arr) {
      if (nTimesMaxNum % num !== 0) {
        allPass = false;
        break;
      }
    }

    if (allPass) {
      answer = nTimesMaxNum;
      break;
    }

    i++;
  }

  return answer;
}
