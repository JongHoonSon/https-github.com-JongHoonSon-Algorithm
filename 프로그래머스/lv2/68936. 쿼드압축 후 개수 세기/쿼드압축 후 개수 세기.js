function solution(arr) {
  var answer = [];

  console.log(arr);

  console.log(arr.length);

  let length = arr.length - 1;

  // 처음에는 주어진 정사각형의 크기로 판단
  quad([0, length], [0, length]);

  function quad([fromX, toX], [fromY, toY]) {
    // 매개변수로 받은 정사각형에 들어있는 모든 값이 같은지의 여부를 저장할 변수
    let allTheSame = true;

    // 정사각형의 맨 왼쪽 맨위에 있는 값
    // (나머지 부분이 이 값과 같은지 비교하기 위해 사용)
    let firstValue = arr[fromY][fromX];

    // 만약 현재 탐색 중인 정사각형이 1x1 크기의 정사각형일 경우
    // (= from과 toX가 같으면서 from 가 toY가 같으면, 1x1 크기의 정사각형임)
    if (fromX === toX && fromY === toY) {
      // console.log("------------------");
      // console.log("length 1 found");
      // console.log("fromX : ", fromX);
      // console.log("toX : ", toX);
      // console.log("fromY : ", fromY);
      // console.log("toY : ", toY);
      // console.log("firstValue : ", firstValue);
      // console.log("------------------");

      // 쿼드 압축의 조건을 따질 필요 없이, 해당 정사각형의 값을 넣음
      answer.push(firstValue);
      return true;
    }

    // 1x1 크기의 정사각형이 아닌 경우,

    // 정사각형의 세로 길이만큼 반복
    for (let i = fromY; i <= toY; i++) {
      // 정사각형의 가로 길이만큼 반복
      for (let j = fromX; j <= toX; j++) {
        // 만약 firstValue와 다른 값이 있으면
        if (arr[i][j] !== firstValue) {
          // allTheSame을 false로 변경하고 종료함
          allTheSame = false;
          break;
        }
      }
    }

    // 현재 탐색중인 정사각형 안의 값이 모두 같으면
    if (allTheSame === true) {
      // answer에 해당 값을 넣고 종료
      answer.push(firstValue);
      return true;

      // 현재 탐색중인 정사각형 안의 값이 모두 같지 않으면
      // => 쿼드 압축 진행
    } else {
      // X의 중간이 되는 값 (범위가 0~7이라면 4)
      let separateByX = (fromX + toX + 1) / 2;

      // Y의 중간이 되는 값 (범위가 4~7이라면 6)
      let separateByY = (fromY + toY + 1) / 2;

      // 4등분 시 왼쪽 위의 정사각형
      let firstX = [fromX, separateByX - 1];
      let firstY = [fromY, separateByY - 1];

      // 4등분 시 오른쪽 위의 정사각형
      let secondX = [separateByX, toX];
      let secondY = [fromY, separateByY - 1];

      // 4등분 시 왼쪽 아래의 정사각형
      let thirdX = [fromX, separateByX - 1];
      let thirdY = [separateByY, toY];

      // 4등분 시 오른쪽 아래의 정사각형
      let fourthX = [separateByX, toX];
      let fourthY = [separateByY, toY];

      // 각 정사각형에 대해 재귀호출
      quad(firstX, firstY);
      quad(secondX, secondY);
      quad(thirdX, thirdY);
      quad(fourthX, fourthY);

      return true;
    }
  }

  console.log(answer);

  // 최종적으로 answer에 들어 있는 0의 갯수와 1의 갯수를 세서 출력하면 끝

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

// 문제 풀이 접근 방식

// 주어진 크기의 정사각형의 안에 들어있는 값을 확인하고,
// 모든 값이 같다면 => 해당 값을 더하기
// 모든 값이 같지 않다면 => 쿼드 압축 진행

// 쿼드 압축에는 재귀함수가 사용되며
// 현재 쿼드 압축을 진행해야되는지의 여부를 판단할 때 나눈 구간을
// 다시 한 번 4개로 나눠서 재귀함수를 호출하는 방식으로 구현한다.
