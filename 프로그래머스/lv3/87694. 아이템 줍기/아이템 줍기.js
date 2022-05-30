function solution(rectangle, characterX, characterY, itemX, itemY) {
  var answer = 0;

  let doubledGraph = new Array(101);

  for (let i = 1; i <= 100; i++) {
    doubledGraph[i] = new Array(101).fill(0);
  }

  const move = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  for (let i = 1; i < 100; i++) {
    // console.log(doubledGraph[i]);
  }

  const doubledRect = rectangle.map((el) => el.map((v) => v * 2));

  doubledRect.forEach(([x1, y1, x2, y2]) => {
    for (let i = y1; i <= y2; i++) {
      for (let j = x1; j <= x2; j++) {
        if (j === x1 || j === x2 || i === y1 || i === y2) {
          if (doubledGraph[j][i] !== 2) {
            doubledGraph[j][i] = 1;
          }
        } else {
          doubledGraph[j][i] = 2;
        }
      }
    }
  });

  characterX *= 2;
  characterY *= 2;
  itemX *= 2;
  itemY *= 2;

  doubledGraph[characterX][characterY] += 100;

  answer = BFS();

  function BFS() {
    let queue = [];
    queue.push([characterX, characterY, 0]);

    while (queue.length) {
      const [nowX, nowY, times] = queue.shift();

      if (nowX === itemX && nowY === itemY) {
        return times / 2;
      }

      for (let i = 0; i < 4; i++) {
        const [nX, nY] = [nowX + move[i][0], nowY + move[i][1]];

        if (nX <= 0 || nX >= 101 || nY <= 0 || nY >= 101) {
          continue;
        }

        if (doubledGraph[nX][nY] === 1) {
          doubledGraph[nX][nY] += 100;
          queue.push([nX, nY, times + 1]);
        }
      }
    }
  }

  return answer;
}

// 후기

// 약 한시간동안 문제를 풀기위해 여러가지 방법을 떠올려봤지만,
// 도무지 방법이 생각이 안나서 구글링을 통해 문제 풀이 접근 방식을 알게되었다.

// 문제 풀이 접근 방식

// 주어진 도형을 차례대로 확인하면서 graph 상에 옮긴다.
// 각 도형의 가로 길이와 세로 길이를 이중 반복문을 이용해서 반복하여

// 도형에 속하는 모든 좌표에 대해 확인하면서 해당 좌표가 도형의 테두리인 경우
// (시작점(왼쪽 아래)과 x좌표 또는 y좌표가 같거나, 끝점(오른쪽 위)과 x좌표 또는 y좌표가 같은 경우)
// graph 상에 1을 저장하고,

// 해당 좌표가 도형의 테두리 안쪽인 경우
// graph 상에 2를 저장한다.

// 모든 도형에 대해 이 과정을 반복하면 각 좌표의 값은 3가지 경우로 나뉜다.

// 좌표의 값
// 0 : 아예 도형이 존재하지 않는 곳
// 1 : 도형이 존재하고, 테두리가 혼자인 곳
// 2 : 도형이 존재하고, 테두리 안쪽인 곳

// 특정 좌표가 한 도형의 테두리이지만, 다른 도형의 테두리 안쪽 부분인 경우
// 테두리 안쪽 부분이 해당 테두리를 먹어버리기 때문에 해당 좌표의 값은 2이다.
// 따라서 테두리 중에서 다른 도형의 안쪽 부분에 해당하지 않는
// 모든 도형을 겹쳤을 때, 가장 바깥 테두리들의 좌표의 값만 1이 된다.

// 이후 1인 곳을 BFS로 탐방하면서 목적지까지의 최단거리를 구한다.

// 한가지 주의할 점은, 이동 단위가 1칸이기 때문에
// 꼬불꼬불한 길이 나와도 스트레이트로 갈 수 있다.

// 예를 들면 0이 이동 가능한 곳이라고 할 때

// xxxxx
// xx00x
// xx00x
// xx00x
// xxxxx

// 위 같은 그래프가 있다고 하자
// 또, 원래대로라면 이동 순서는

// xxxxx
// xx12x
// xx43x
// xx56x
// xxxxx

// 로 이동하는 꼬불꼬불한 길이라고 하자.

// 만약 1칸 씩 이동하는 경우, BFS를 진행할 때 다음과 같은 오류가 생긴다.

// xxxxx
// xx10x
// xx20x
// xx30x
// xxxxx

// 꼬불꼬불한 길을 무시하고, 아래로 1칸을 이동하여 BFS를 수행하는 것이다.

// 따라서 입력으로 주어지는 모든 도형의 크기, 출발점, 도착점, 그래프를 x2해서 두 배로 늘려준 후 진행하면

// xxxxxxxxxx
// xxxx1122xx
// xxxxxxx2xx
// xxxxxxx3xx
// xxxx4433xx
// xxxx4xxxxx
// xxxx5xxxxx
// xxxx5566xx
// xxxxxxxxxx

// 위처럼 1칸 씩 이동하여 생기는 오류가 없어지게 된다.

// 따라서 위 상태에서 BFS를 이용해 최단 거리를 구하고,
// 구한 최단 거리를 2로 나누면, 원래 문제에서 요구하는 최단 거리를 구할 수 있다.
