const fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const N = +input.shift();
const tree = {};
for (let i = 0; i < N; i++) {
  const [node, left, right] = input[i].trim().split(" ");
  tree[node] = [left, right]; // tree의 키 값으로 노드를 저장하고, 값으로는 left, right가 담긴 배열을 저장한다.
}

// console.log("tree", tree);

let answer = [];

let preorderResult = "";
let inorderResult = "";
let postorderResult = "";

// 전위순회는 루트부터 기록을 시작하므로, 재귀의 맨 앞에서 우선 기록한다.
function preorder(node) {
  if (node === ".") return;
  const [lt, rt] = tree[node];
  preorderResult += node;
  preorder(lt);
  preorder(rt);
}

// 중위순회는 왼쪽-루트-오른쪽 순이므로, 왼쪽의 재귀가 끝난 시점에서 기록한다.
function inorder(node) {
  if (node === ".") return;
  const [lt, rt] = tree[node];
  inorder(lt);
  inorderResult += node;
  inorder(rt);
}

// 후위순회는 왼쪽-오른쪽-루트 순이므로, 왼쪽과 오른쪽 재귀가 끝난 시점에서 기록한다.
function postorder(node) {
  if (node === ".") return;
  const [lt, rt] = tree[node];
  postorder(lt);
  postorder(rt);
  postorderResult += node;
}

preorder("A");
inorder("A");
postorder("A");

answer.push(preorderResult);
answer.push(inorderResult);
answer.push(postorderResult);

console.log(answer.join("\n"));
