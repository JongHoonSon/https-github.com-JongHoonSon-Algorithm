function solution(n, k, cmd) {
  let answer = new Array(n);
  for (let i = 0; i < n; i++) {
    answer[i] = "O";
  }

  let root = new Node(0);
  let curNode = root;
  let prevNode = root;
  for (let i = 1; i < n; i++) {
    const newNode = new Node(i, prevNode);
    prevNode.next = newNode;
    prevNode = newNode;

    if (i === k) {
      curNode = newNode;
    }
  }

  const history = [];
  cmd.map((commandLine) => {
    const [command, count] = commandLine.split(" ");
    let i = 0;
    switch (command) {
      case "U":
        while (i < count && curNode.prev) {
          curNode = curNode.prev;
          i++;
        }
        break;
      case "D":
        while (i < count && curNode.next) {
          curNode = curNode.next;
          i++;
        }
        break;
      case "C":
        history.push(curNode);
        const prev = curNode.prev;
        const next = curNode.next;
        if (prev && next) {
          prev.next = next;
          next.prev = prev;
          curNode = next;
        } else if (prev) {
          prev.next = null;
          curNode = prev;
        } else if (next) {
          next.prev = null;
          curNode = next;
        }
        break;
      case "Z":
        const node = history.pop();
        const prevNode = node.prev;
        const nextNode = node.next;
        if (prevNode) {
          prevNode.next = node;
        }
        if (nextNode) {
          nextNode.prev = node;
        }
        break;
    }
  });

  history.map((node) => {
    answer[node.idx] = "X";
  });
  return answer.join("");
}

const Node = function (idx, prevNode) {
  this.idx = idx;
  this.prev = prevNode;
  this.next;
};

// 후기

// 완전탐색으로 풀었다가 30개 중 2개의 정확성 테케, 10개 중 절반인 5개의 효율성 테케를 통과하지 못했다.
// 문제 설명을 읽으면서 입력으로 주어지는 모든 X의 합이 100만 이라는 것을 고려해서, 최대 100만 번의 연산이 이루어질 줄 알았는데,
// 생각해보니 X가 음수로 주어질 수 있기 때문에 X가 -100만, +100만, -100만, ..., +100만 이런식으로 주어진다면,
// 총 연산 횟수가 100만 x 20만이 되기 때문에 완전탐색으로는 시간 초과가 발생할 수 밖에 없었다.
// 처음부터 이를 알아챘어야 했는데 알아채지 못하였고, 문제를 푸는데 실패했고, 이후에도 문제 풀이 방식이 떠오르지 않아 구글링을 통해 검색했다.

// 문제 풀이 접근 방식

// 이 문제는 양방향 리스트를 이용하여 풀 수 있다. 먼저 양방향 리스트를 구현하기 위해 Node라는 사용자 정의 객체를 만든다.
// 각 노드는 본인의 index와 본인과 연결된 앞, 뒤 노드를 기록하고 있다.
// 기본 값으로 "O"를 갖고 있는 크기 n의 양방향 리스트를 만든 후,
// 입력으로 주어지는 명령어를 하나씩 확인하면서 pointer를 옮겨가며 명령어을 수행한 뒤에
// 최종적으로 양방향 리스트의 값을 하나씩 출력하면 된다.
