function solution(arr) {
  var answer = [];

  console.log(arr);

  console.log(arr.length);

  let length = arr.length - 1;

  quad([0, length], [0, length]);

  function quad([fromX, toX], [fromY, toY]) {
    let allTheSame = true;
    let firstValue = arr[fromY][fromX];

    if (fromX === toX && fromY === toY) {
      // console.log("------------------");
      // console.log("length 1 found");
      // console.log("fromX : ", fromX);
      // console.log("toX : ", toX);
      // console.log("fromY : ", fromY);
      // console.log("toY : ", toY);
      // console.log("firstValue : ", firstValue);
      // console.log("------------------");
      answer.push(firstValue);
      return true;
    }

    for (let i = fromY; i <= toY; i++) {
      for (let j = fromX; j <= toX; j++) {
        if (arr[i][j] !== firstValue) {
          allTheSame = false;
          break;
        }
      }
    }

    if (allTheSame === true) {
      answer.push(firstValue);
      return true;
    } else {
      let separateByX = (fromX + toX + 1) / 2;
      let separateByY = (fromY + toY + 1) / 2;

      let firstX = [fromX, separateByX - 1];
      let firstY = [fromY, separateByY - 1];

      let secondX = [separateByX, toX];
      let secondY = [fromY, separateByY - 1];

      let thirdX = [fromX, separateByX - 1];
      let thirdY = [separateByY, toY];

      let fourthX = [separateByX, toX];
      let fourthY = [separateByY, toY];

      quad(firstX, firstY);
      quad(secondX, secondY);
      quad(thirdX, thirdY);
      quad(fourthX, fourthY);

      return true;
    }
  }

  console.log(answer);

  let zeroCnt = 0;
  let oneCnt = 0;

  for (let i = 0; i < answer.length; i++) {
    if (answer[i] === 1) {
      oneCnt++;
    } else {
      zeroCnt++;
    }
  }

  answer = [zeroCnt, oneCnt];

  return answer;
}
