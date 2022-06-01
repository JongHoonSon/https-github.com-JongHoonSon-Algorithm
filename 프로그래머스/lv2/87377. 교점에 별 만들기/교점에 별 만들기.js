function solution(line) {
  var answer = [];

  // 두 선분의 교점 중에서 별을 찍을 수 있는 곳(좌표값이 1로 나누어 떨어지는 곳)의
  // 좌표를 저장하는 배열
  let stars = new Array();

  // 각 교점의 좌표 중에서
  // x값의 최솟값, 최댓값을 각각 minX, maxX에 저장
  let minX = Infinity;
  let maxX = -Infinity;

  // y값의 최솟값, 최댓값을 각각 minY, maxY에 저장
  let minY = Infinity;
  let maxY = -Infinity;

  // 주어진 모든 선분에 대해 반복
  for (let i = 0; i < line.length; i++) {
    // 선분 a의 값을 A, B, C에 저장
    let [A, B, E] = line[i];

    // 주어진 모든 선분에 대해 반복 (이중 반복문)
    for (let j = 0; j < line.length; j++) {
      // 만약 본인과 같은 선분이라면 넘어감
      if (i === j) {
        continue;
      }

      // 선분 b의 값을 C, D, F에 저장
      let [C, D, F] = line[j];

      // 선분 a와 선분 b의 기울기의 차이를 구함
      let mod = A * D - B * C;

      // 기울기가 같다면 (차이가 0이라면)
      // 해당 선분 a와 선분 b로는 교점을 구할 수 없으므로 넘어감
      if (mod === 0) {
        continue;
      } else {
        // (x, y)는 두 선분 a와 b의 교점의 좌표
        let x = (B * F - E * D) / mod;
        let y = (E * C - A * F) / mod;

        // 만약 두 교점의 좌표가 1로 나누어 떨어지 않을 경우
        // (1.5, 0.5) 등
        // 해당 좌표에는 점을 찍을 수 없으므로 넘어감 (문제 조건)
        if (x % 1 !== 0 || y % 1 !== 0) {
          continue;
        } else {
          // 1로 나누어 떨어지는 경우
          // 별을 찍을 수 있는 좌표가 들어 있는 배열
          stars.push([x, y]);
        }

        // 구한 (x, y) 로
        // x좌표값과 y좌표값의 최솟값 및 최댓값을 갱신
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  // 그래프의 세로 길이 (y좌표의 최댓값 - y좌표의 최솟값 + 1)
  // 1번 index부터 사용하기 위해 1을 더함
  let graph = new Array(maxY - minY + 1);

  // 그래프의 가로 길이 (x좌표의 최댓값 - x좌표의 최솟값 + 1)
  // 1번 index부터 사용하기 위해 1을 더함
  for (let i = 0; i < maxY - minY + 1; i++) {
    // graph 상의 모든 좌표의 기본 값은 '.'로 함
    graph[i] = new Array(maxX - minX + 1).fill(".");
    // console.log(graph[i].join(""));
  }

  // 별의 좌표를 기록한 stars를 반복하면서
  // graph 상에 별을 기록함
  for (let i = 0; i < stars.length; i++) {
    let [x, y] = stars[i];

    graph[maxY - y][x - minX] = "*";
  }

  for (let i = 0; i < maxY - minY + 1; i++) {
    // console.log(graph[i].join(""));
  }

  graph.forEach((el) => {
    answer.push(el.join(""));
  });

  return answer;
}
