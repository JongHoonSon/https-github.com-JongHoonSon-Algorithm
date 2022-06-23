function solution(brown, yellow) {
  var answer = [];

  let yellowWidth;
  let yellowHeight;

  let brownWidth;
  let brownHeight;

  for (let i = 1; i <= yellow; i++) {
    for (let j = 1; j * i <= yellow; j++) {
      if (i * j === yellow) {
        yellowWidth = i;
        yellowHeight = j;
      }

      if ((yellowWidth + 2) * 2 + yellowHeight * 2 === brown) {
        if (yellowWidth < yellowHeight) {
          answer = [yellowHeight + 2, yellowWidth + 2];
        } else {
          answer = [yellowWidth + 2, yellowHeight + 2];
        }
      }
    }
  }

  return answer;
}
