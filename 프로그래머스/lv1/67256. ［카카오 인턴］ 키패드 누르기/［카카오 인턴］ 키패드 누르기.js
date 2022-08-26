function solution(numbers, hand) {
  var answer = "";

  let nowLeftPos = { row: 4, col: 1 };
  let nowRightPos = { row: 4, col: 3 };

  for (let i = 0; i < numbers.length; i++) {
    let thisNumber = numbers[i];

    if (thisNumber === 1 || thisNumber === 4 || thisNumber === 7) {
      answer = answer + "L";

      if (thisNumber === 1) {
        nowLeftPos = { row: 1, col: 1 };
      } else if (thisNumber === 4) {
        nowLeftPos = { row: 2, col: 1 };
      } else if (thisNumber === 7) {
        nowLeftPos = { row: 3, col: 1 };
      }
    } else if (thisNumber === 3 || thisNumber === 6 || thisNumber === 9) {
      answer = answer + "R";

      if (thisNumber === 3) {
        nowRightPos = { row: 1, col: 3 };
      } else if (thisNumber === 6) {
        nowRightPos = { row: 2, col: 3 };
      } else if (thisNumber === 9) {
        nowRightPos = { row: 3, col: 3 };
      }
    } else {
      let thisPos;
      let leftGap;
      let rightGap;

      if (thisNumber === 2) {
        thisPos = { row: 1, col: 2 };
      } else if (thisNumber === 5) {
        thisPos = { row: 2, col: 2 };
      } else if (thisNumber === 8) {
        thisPos = { row: 3, col: 2 };
      } else if (thisNumber === 0) {
        thisPos = { row: 4, col: 2 };
      }

      leftGap =
        Math.abs(nowLeftPos.row - thisPos.row) +
        Math.abs(nowLeftPos.col - thisPos.col);
      rightGap =
        Math.abs(nowRightPos.row - thisPos.row) +
        Math.abs(nowRightPos.col - thisPos.col);

      if (leftGap > rightGap) {
        nowRightPos = thisPos;
        answer = answer + "R";
      } else if (leftGap < rightGap) {
        nowLeftPos = thisPos;
        answer = answer + "L";
      } else {
        if (hand === "left") {
          nowLeftPos = thisPos;
          answer = answer + "L";
        } else {
          nowRightPos = thisPos;
          answer = answer + "R";
        }
      }
    }
  }

  return answer;
}

// 문제 풀이 접근 방식

// 먼저 맨 처음 양 손가락의 위치를 nowLeftPos, nowRightPos에 저장한다.
// 그 후 다음 번에 눌러야하는 곳의 위치를 보고,
// 왼손가락으로만 눌러야하는 왼쪽열인 경우 왼손가락으로 누르고, 왼손가락의 위치를 변경한다.
// 오른손가락으로만 눌러야하는 오른쪽열인 경우 오른손가락으로 누르고, 오른손가락의 위치를 변경한다.
// 만약 두 손가락 모두 누를 수 있는 중간열인 경우, 해당 위치와 왼손가락의 위치와 오른손가락의 위치의 차이를 구하고,
// 더 차이가 적은 손가락으로 누른다.
// 이 과정을 누를 번호가 담긴 numbers의 모든 원소를 반복할 때까지 반복하고,
// 버튼을 누를 때마다 어떤 손가락으로 눌렀는지를 저장하였다가, 이를 출력한다.
