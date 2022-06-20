function solution(n, k, cmd) {
  // n개의 노드의 값을 "O" 로 초기화
  // 이후 삭제된 노드에 대해 "X" 로 변경
  let answer = new Array(n);
  for (let i = 0; i < n; i++) {
    answer[i] = "O";
  }

  // 루트 노드
  let root = new Node(0);

  // 현재 노드와 이전 노드를 가리키는 pointer를 모두 root 노드로 설정
  let curNodePointer = root;
  let prevNodePointer = root;

  // 1번 노드부터 n-1번 노드까지, 총 n-1개의 노드 생성
  for (let i = 1; i < n; i++) {
    // 새로운 노드 생성
    // i : 새로운 노드의 index에 할당
    // prevNodePointer : 새로운 노드의 prev에 할당
    const newNode = new Node(i, prevNodePointer);

    // 이전 노드의 next에 현재 생성한 노드 할당
    prevNodePointer.next = newNode;

    // 이전 노드를 가리키는 포인터가 현재 노드를 가르키게 함
    prevNodePointer = newNode;

    // 만약 i가 문제에서 주어지는 시작 원소의 값 k와 같다면,
    // 현재 노드를 가리키는 포인터가 현재 생성된 노드를 가르키게 함
    if (i === k) {
      curNodePointer = newNode;
    }
  }

  // 삭제된 원소를 저장할 deleted 배열
  const deleted = [];

  // 각 명령어에 대해 반복
  for (let i = 0; i < cmd.length; i++) {
    // 명령어를 command와 moveN에 저장
    const [command, moveN] = cmd[i].split(" ");

    // 몇번 움직였는지를 기록할 변수
    let n = 0;

    // 명령어가
    switch (command) {
      // U 일 경우,
      case "U":
        // moveN번 curNodePointer를 prev로 옮김
        while (n < moveN && curNodePointer.prev) {
          curNodePointer = curNodePointer.prev;
          n++;
        }
        break;

      // D 일 경우,
      case "D":
        while (n < moveN && curNodePointer.next) {
          curNodePointer = curNodePointer.next;
          n++;
        }
        break;

      // C 일 경우,
      case "C":
        // curNodePointer를 deleted 배열에 넣음
        deleted.push(curNodePointer);

        // 삭제된 curNodePointer가 가르키고 있던 노드의 prev와 next 정보를 변수에 저장
        const prev = curNodePointer.prev;
        const next = curNodePointer.next;

        // prev와 next가 모두 존재한다면 (삭제된 노드가 양방향 리스트 상 중간에 위치)
        if (prev && next) {
          // 삭제된 노드의 앞의 노드에 삭제된 노드의 뒤의 노드를 연결
          prev.next = next;

          // 삭제된 노드의 뒤의 노드에 삭제된 노드의 앞의 노드를 연결
          next.prev = prev;

          // curNodePointer를 뒤의 노드로 변경
          curNodePointer = next;

          // prev만 존재한다면 (삭제된 노드가 양방향 리스트 상 마지막에 위치)
        } else if (prev) {
          // 삭제된 노드의 앞의 노드의 next 값을 null로 변경
          prev.next = null;

          // curNodePointer를 앞의 노드로 변경
          curNodePointer = prev;

          // next만 존재한다면 (삭제된 노드가 양방향 리스트 상 처음에 위치)
        } else if (next) {
          // 삭제된 노드의 앞의 노드의 next 값을 null로 변경
          next.prev = null;

          // curNodePointer를 뒤의 노드로 변경
          curNodePointer = next;
        }
        break;

      // Z 일 경우,
      case "Z":
        // deleted 에 들어 있는 노드 중에서 마지막으로 push된(=마지막으로 삭제된) 노드를 꺼냄
        const lastDeletedNode = deleted.pop();

        // prevNodePointer가 마지막으로 삭제된 노드의 prev에 들어있는 노드를 가르키게 함
        const prevNodePointer = lastDeletedNode.prev;

        // nextNodePointer가 마지막으로 삭제된 노드의 next에 들어있는 노드를 가르키게 함
        const nextNodePointer = lastDeletedNode.next;

        // 마지막으로 삭제된 노드를 양방향 리스트에 다시 넣는 과정

        // 만약 prevNodePointer가 null이 아니면 (삭제된 노드의 prev 노드가 있었다면)
        if (prevNodePointer) {
          // prevNodePointer의 next에 마지막으로 삭제된 노드를 넣음
          prevNodePointer.next = lastDeletedNode;
        }

        // 만약 nextNodePointer가 null이 아니면 (삭제된 노드의 next 노드가 있었다면)
        if (nextNodePointer) {
          // nextNodePointerd의 prev에 마지막으로 삭제된 노드를 넣음
          nextNodePointer.prev = lastDeletedNode;
        }
        break;
    }
  }

  // 모든 명령어에 대한 처리가 끝나면,
  // deleted 배열에 들어있는 노드의 idx 값을
  // answer의 index로 하는 원소의 값을 "X"로 변경함
  deleted.map((node) => {
    answer[node.idx] = "X";
  });

  // answer을 출력함
  return answer.join("");
}

const Node = function (idx, prevNodePointer) {
  this.idx = idx;
  this.prev = prevNodePointer;
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
