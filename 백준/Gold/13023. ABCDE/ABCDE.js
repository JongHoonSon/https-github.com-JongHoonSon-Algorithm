const sol = (input) => {
  const [N, M] = input[0].split(" ").map((v) => +v);
  const adjArr = Array.from({length:N}, ()=>Array(0)); // N개의 행을 가지며 행마다 빈 배열을 하나씩 가진다.
  const check = new Array(N).fill(0);
  let flag = 0;
  for (let i = 1; i <= M; i++) {
    const [a, b] = input[i].split(" ").map((v) => +v);
    adjArr[a].push(b);
    adjArr[b].push(a);
  } // 인접리스트에 a->b, b->a 관계를 각각 넣어준다.

  const dfs = (L, cnt) => {
    if (flag) return; // 조건을 만족하면 빠르게 재귀를 종료하기 위한 조건문.
    check[L] = 1; // 노드를 방문한다.
    if (cnt === 4) {
      flag = 1;
      return;
    }

    for (let i = 0; i < adjArr[L].length; i++) { // 현재 노드의 인접리스트인 addArr[L] 크기 이용
      const next = adjArr[L][i]; // 다음에 이동할 수도 있는 노드
      if (!check[next]) { // next 노드에 방문하지 않았다면, 방문하자.
        dfs(next, cnt + 1);
      }
    }
    check[L] = 0; // 방문했던 노드는 다시 미방문 처리한다.
  };

  for (let j = 0; j < N; j++) {
    dfs(j, 0); // 처음 방문할 노드를 선택한다.
  }
  return flag;
};

const input = [];
require("readline")
  .createInterface(process.stdin, process.stdout)
  .on("line", (line) => {
    input.push(line);
  })
  .on("close", () => {
    console.log(sol(input));
    process.exit();
  });