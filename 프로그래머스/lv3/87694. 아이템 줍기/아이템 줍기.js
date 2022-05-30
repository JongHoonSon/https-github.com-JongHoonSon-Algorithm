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
