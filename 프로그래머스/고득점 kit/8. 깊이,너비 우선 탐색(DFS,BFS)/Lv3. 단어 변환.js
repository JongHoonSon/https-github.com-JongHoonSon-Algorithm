function solution(begin, target, words) {
  var answer = 0;

  // 0. 밑 작업
  // 시작 문자열인 begin이 words에 없기때문에 words에 push해줌
  // (begin도 하나의 노드로, graph와 willVisit을 만들 때 words를 참조하는데,
  // 이때 begin도 함께 처리되도록 하는 것)
  words.push(begin);

  // 1. 그래프 만들기 (key: 각 입력 문자열, value: 각 문자열의 인접 문자열 )
  let graph = new Map();

  // 1-1. 입력 문자열을 key로 하고, 빈 배열을 갖는 요소 생성
  for (let i = 0; i < words.length; i++) {
    graph.set(words[i], []);
  }

  // 1-2. words를 탐방하면서, 자리가 1개가 다른 인접 문자열을 찾아 graph에 추가
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words.length; j++) {
      let cnt = 0;
      for (let k = 0; k < begin.length; k++) {
        if (words[i][k] !== words[j][k]) {
          cnt++;
        }
      }
      if (cnt === 1) {
        graph.set(words[i], [...graph.get(words[i]), words[j]]);
      }
    }
  }
  console.log(graph);

  // 2. willVisit 만들기 (key: 각 입력 문자열, value: 각 문자열의 방문 여부)

  let willVisit = new Map();

  willVisit.set(begin, false);

  for (let i = 0; i < words.length; i++) {
    willVisit.set(words[i], false);
  }
  console.log(willVisit);

  // 3. BFS 수행

  const result = BFS(begin);

  if (result === false) {
    answer = 0;
  } else {
    answer = result;
  }

  // 4. BFS 구현

  function BFS(startNode) {
    let queue = [];
    queue.push(startNode);
    willVisit.set(startNode, true);

    let idx = 0;
    let startIndex = 0;
    let lastIndex = 0;

    let times = 1;
    let flag = false;

    while (queue.length !== idx) {
      startIndex = idx;
      lastIndex = queue.length - 1;

      for (let i = startIndex; i <= lastIndex; i++) {
        const x = queue[i];
        idx++;

        // xFriends : x의 인접 문자열이 담긴 배열
        const xFriends = graph.get(x);

        console.log("xFriends : ", xFriends);

        // x의 인접 문자열이 담긴 배열의 크기가 1 이상이면, 방문
        if (xFriends.length > 0) {
          for (let j = 0; j < xFriends.length; j++) {
            const y = xFriends[j];

            // target을 찾은 경우, BFS를 진행한 횟수 리턴
            if (y === target) {
              flag = true;
              return times;
            }

            // 방문하지 않은 경우, 큐에 넣고 방문 처리
            if (willVisit.get(y) === false) {
              queue.push(y);
              willVisit.set(y, true);
            }
          }
        }
      }
      times++;
    }

    // 모든 노드를 탐색한 후,
    // target을 찾았다면 일찍 return을 만나 끝났겠지만,
    // 못찾았기 때문에, false를 리턴함
    return false;
  }

  return answer;
}

// 문제 풀이 접근 방식

// BFS를 이용해서 주어진 시작 문자 begin으로부터 도착 문자 target을 만드는데 까지
// BFS가 몇 번 진행되는지 찾는 문제이다.

// BFS를 사용하기 위해 graph와 wiilVisit 두 가지 Map이 사용된다.
// Array가 아닌 Map을 사용한 이유는, 입력이 문자열 형태이기 때문에,
// 이를 배열에다가 저장하면 값을 바로 꺼내쓰기 힘들기 때문에,
// Map에다가 각 입력된 문자열을 키로하여 바로바로 꺼내쓸 수 있도록 하였다.

// graph는 입력 문자열을 key로 하고, 본인의 인접 문자열을 words에서 찾아
// value에 배열 형태로 갖고있다.
// ex) 'hot'을 key로 하는 value는
// 'hot'의 인접 문자열이 담긴 배열 ['hit', 'dot' ...] 이다.

// willVisit은 각 입력 문자열을 key로 하고, 방문 여부를 value로 갖는다.

// 이 문제에서 한가지 주의해야할 점은 처음 begin이 words에 들어있지 않기 때문에,
// words만 가지고 graph와 willVisit을 만들어서 진행할 경우,
// 정작 begin이 없기 때문에 BFS가 정상적으로 수행되지 않는다.
// 따라서 맨처음에 words에 begin을 push해야한다.
