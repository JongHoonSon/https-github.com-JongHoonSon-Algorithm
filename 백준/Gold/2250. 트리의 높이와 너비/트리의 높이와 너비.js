const sol = (input) => {
  const N = +input[0];
  input = input.slice(1);
  const tree = Array.from({ length: N + 1 }, () => new Array()); // 트리 배열
  const findRoot = Array.from({ length: N + 1 }, () => 0); // 루트 노드를 찾는 배열
  input.map((str) => {
    const [from, ...nextInfo] = str.split(" ").map(Number);
    findRoot[from]++;
    for (let to of nextInfo) {
      tree[from].push(to);
      findRoot[to]++;
    }    // 입력을 받으면서 트리에 값을 넣어주고 findRoot 배열에서 노드 별 카운트를 증가시킨다.
  });

  const rootNode = findRoot.indexOf(1); // findRoot 배열에서 카운트가 1인 인덱스가 루트노드.
  const rows = Array.from({ length: N + 1 }, () => new Array()); 
  // 각 레벨(row)별로 노드의 column 값을 저장하기 위해 배열 rows 선언
  let column = 1; // column의 시작 값을 1로 정해준다.(문제에서 1부터 19까지 column값을 가지므로!)

  function dfs(L, node) {
    const [left, right] = tree[node];
    if (left !== -1) dfs(L + 1, left);
    rows[L].push(column++); 
    //중위 순회이므로, 이 시점에서 L(레벨) 인덱스에 column값(노드의 column값)을 넣어주고 다음 노드를 위해 column 값을 1 증가시킨다.
    if (right !== -1) dfs(L + 1, right);
  }
  dfs(1, rootNode); // Level=1, 시작 노드는 rootNode로 깊이우선탐색(dfs)을 실행


  let max = [0, 0];
  rows.map((row, level) => {
    if (!row.length) return; // 크기가 0이라면 해당 row(레벨)에는 노드가 없다.
    const width = Math.max(...row) - Math.min(...row) + 1;
    if (width > max[1]) max = [level, width]; // 해당 레벨의 최대너비 = 노드의 최대 column값 - 최소 column값 + 1
  });

  return max.join(" "); // max 변수에 [레벨, 최대너비] 순으로 값이 존재한다.
};

// 백준에서 입력을 받는 코드
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