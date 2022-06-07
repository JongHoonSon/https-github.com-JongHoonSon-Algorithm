function solution(dirs) {
  var answer = 0;

  let x = 0;
  let y = 0;

  let dirsArr = dirs.split("");
  let path = [];

  // 이동 방향에 대해 반복하며 하나씩 확인
  for (let i = 0; i < dirsArr.length; i++) {
    // x축으로 y축으로 이동해야하는 값을 저장
    let xMove = 0;
    let yMove = 0;

    // 이동하는 방향에 따라 xMove, yMove 값을 조정하고,
    // 만약 범위가 벗어난 경우 이번 단계를 넘어간다.
    if (dirsArr[i] === "U") {
      if (y === 5) {
        continue;
      }
      yMove = 1;
    } else if (dirsArr[i] === "D") {
      if (y === -5) {
        continue;
      }
      yMove = -1;
    } else if (dirsArr[i] === "L") {
      if (x === 5) {
        continue;
      }
      xMove = 1;
    } else {
      if (x === -5) {
        continue;
      }
      xMove = -1;
    }

    // 이미 사용된 경로인지를 저장하기 위한 변수
    let alreadyUsedFlag = false;

    // 기존에 이용했던 모든 경로를 반복하며 하나씩 확인
    for (let i = 0; i < path.length; i++) {
      // 사용했던 경로(객체 형태)
      let history = path[i];

      // 만약 이번 경로가 A -> B 일 때,
      // A -> B 로 이동하는 경로를 이용한 기록이나
      // B -> A 로 이동하는 경로를 이용한 기록이 있을 경우,
      // alreadyUsedFlag 를 true로 변경한다.

      if (
        (history.from.x === x &&
          history.from.y === y &&
          history.to.x === x + xMove &&
          history.to.y === y + yMove) ||
        (history.to.x === x &&
          history.to.y === y &&
          history.from.x === x + xMove &&
          history.from.y === y + yMove)
      ) {
        alreadyUsedFlag = true;
      }
    }

    // 이번 경로가 사용해본적이 없는 길에 대한 경로라면,
    // 해당 경로를 path에 넣는다.
    if (alreadyUsedFlag === false) {
      path.push({ from: { x: x, y: y }, to: { x: x + xMove, y: y + yMove } });
      path.push({ from: { x: x + xMove, y: y + yMove }, to: { x: x, y: y } });
    }

    // 현 위치를 이동한 곳으로 업데이트 한다.
    x += xMove;
    y += yMove;
  }

  // path에는 길에 대해 2가지 경로가 들어 있으므로
  // A -> B, B -> A
  // 전체 path를 2로 나누면 사용한 길의 수를 구할 수 있다.
  answer = path.length / 2;

  return answer;
}

// 문제 풀이 접근 방식

// (0,0)부터 시작해서 문제에서 주어진 방향대로 이동한 후,
// 해당 이동한 경로를 path 배열에 넣는다.

// 주의할 점은 path에 경로를 넣을 때, A -> B 에서 사용한 길과, B -> A 에서 사용한 길이 같으므로,
// A -> B를 이용한 이후에, 추후에 B -> A 를 이용할 경우 중복으로 처리할 수 있도록 하기 위해
// 두 가지 경로를 모두 path에 넣는다.
