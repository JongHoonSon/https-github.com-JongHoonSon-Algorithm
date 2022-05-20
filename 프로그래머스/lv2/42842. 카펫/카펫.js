function solution(brown, yellow) {
  var answer = [];

  let calcBrown = 0;

  let yellowWidth;
  let yellowHeight;

  for (let i = 1; i <= yellow; i++) {
    if (yellow % i === 0) {
      yellowWidth = yellow / i;
      yellowHeight = i;
    }
    calcBrown = (yellowWidth + 2) * 2 + yellowHeight * 2;

    if (brown === calcBrown) {
      if (yellowWidth < yellowHeight) {
        let emp = yellowWidth;
        yellowWidth = yellowHeight;
        yellowHeight = emp;
      }
      break;
    }
  }

  answer.push(yellowWidth + 2);
  answer.push(yellowHeight + 2);

  return answer;
}
