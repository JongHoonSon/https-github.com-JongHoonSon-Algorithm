function solution(numbers, hand) {
  var answer = "";

  // 초기 왼손 엄지와 오른손 엄지의 초기 위치
  let nowLeftPos = { row: 4, col: 1 };
  let nowRightPos = { row: 4, col: 3 };

  for (let i = 0; i < numbers.length; i++) {
    // i번째로 누를 번호를 thisNumber에 저장
    let thisNumber = numbers[i];

    // 만약 왼쪽 열에 있는 버튼일 경우, 왼손 엄지로 누르고,
    // 왼손 엄지의 위치를 해당 버튼의 위치로 변경함
    if (thisNumber === 1 || thisNumber === 4 || thisNumber === 7) {
      answer = answer + "L";

      if (thisNumber === 1) {
        nowLeftPos = { row: 1, col: 1 };
      } else if (thisNumber === 4) {
        nowLeftPos = { row: 2, col: 1 };
      } else if (thisNumber === 7) {
        nowLeftPos = { row: 3, col: 1 };
      }
      // 만약 오른쪽 열에 있는 버튼일 경우, 오른손 엄지로 누르고,
      // 오른손 엄지의 위치를 해당 버튼의 위치로 변경함
    } else if (thisNumber === 3 || thisNumber === 6 || thisNumber === 9) {
      answer = answer + "R";

      if (thisNumber === 3) {
        nowRightPos = { row: 1, col: 3 };
      } else if (thisNumber === 6) {
        nowRightPos = { row: 2, col: 3 };
      } else if (thisNumber === 9) {
        nowRightPos = { row: 3, col: 3 };
      }

      // 만약 가운데 열에 있는 버튼일 경우, 왼손 엄지와 오른손 엄지와의 거리를 계산한 후, 가까운 엄지로 누르고,
      // 해당 손의 엄지의 위치를 해당 버튼의 위치로 변경함
    } else {
      let thisPos;
      let leftGap;
      let rightGap;

      // 현재 누를 번호의 위치를 thisPos에 저장
      if (thisNumber === 2) {
        thisPos = { row: 1, col: 2 };
      } else if (thisNumber === 5) {
        thisPos = { row: 2, col: 2 };
      } else if (thisNumber === 8) {
        thisPos = { row: 3, col: 2 };
      } else if (thisNumber === 0) {
        thisPos = { row: 4, col: 2 };
      }

      // 현재 누를 버튼와 왼손 엄지의 위치, 오른손 엄지의 위치의 위치 차이를 계산
      leftGap =
        Math.abs(nowLeftPos.row - thisPos.row) +
        Math.abs(nowLeftPos.col - thisPos.col);
      rightGap =
        Math.abs(nowRightPos.row - thisPos.row) +
        Math.abs(nowRightPos.col - thisPos.col);

      // 오른손 엄지가 더 가깝다면
      if (leftGap > rightGap) {
        nowRightPos = thisPos;
        answer = answer + "R";

        // 왼손 엄지가 더 가깝다면
      } else if (leftGap < rightGap) {
        nowLeftPos = thisPos;
        answer = answer + "L";

        // 두 엄지와 버튼과의 거리가 같은 경우
      } else {
        // 본인이 주로 사용하는 손의 엄지로 누름
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
