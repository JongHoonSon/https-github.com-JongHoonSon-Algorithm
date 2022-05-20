function solution(brown, yellow) {
  var answer = [];

  let calcBrown = 0;

  let yellowWidth;
  let yellowHeight;

  // 1부터 노란색 격자의 수까지 증가
  for (let i = 1; i <= yellow; i++) {
    // 노란색 격자의 수를 n x m 으로 나타낼 수 있는 경우 찾기
    if (yellow % i === 0) {
      yellowWidth = yellow / i;
      yellowHeight = i;
    }

    // 위에서 찾은 경우에서 갈색 격자의 수 계산하기
    calcBrown = (yellowWidth + 2) * 2 + yellowHeight * 2;

    // 만약 계산한 갈색 격자의 수가 문제에서 주어진 갈색 격자의 수와 같다면
    if (brown === calcBrown) {
      // 둘 중 큰 값을 가로로 하고 종료
      if (yellowWidth < yellowHeight) {
        let emp = yellowWidth;
        yellowWidth = yellowHeight;
        yellowHeight = emp;
      }
      break;
    }
  }

  // 정답(갈색 격자의 크기 = 세로 격자의 가로 길이 + 2 x 세로 격자의 세로 길이 + 2)
  answer.push(yellowWidth + 2);
  answer.push(yellowHeight + 2);

  return answer;
}

// 문제 풀이 접근 방식

// 노란색 격자를 갈색 격자가 감싸고 있는 형태인데,
// 갈색 격자의 수는 다음과 같이 계산할 수 있다.

// 가로 바(2개) : 노란색 격자무늬의 가로 길이 + 2 (양쪽에 1씩 추가)
// 세로 바(2개) : 노란색 격자무늬의 세로 길이

// 이를 이용하여 노란색 격자의 갯수가 주어졌을 때,
// 해당 수를 n x m 으로 나타낼 수 있는 n과 m을 찾은 후,
// n과 m(가로와 세로)에 위 공식으로 갈색 격자의 수를 계산한다.

// 계산한 갈색 격자의 수가 주어진 갈색 격자의 수와 같다면,
// 해당 카펫이 문제에서 찾고자하는 카펫이고,
// 해당 카펫의 크기는 노란색 격자의 가로+2 x 세로+2 의 크기를 갖는다.
