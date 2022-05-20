function solution(begin, target, words) {
  var answer = 0;

  words.push(begin);

  let graph = new Map();

  graph.set(begin, []);

  for (let i = 0; i < words.length; i++) {
    graph.set(words[i], []);
  }

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

  let willVisit = new Map();

  willVisit.set(begin, false);

  for (let i = 0; i < words.length; i++) {
    willVisit.set(words[i], false);
  }
  console.log(willVisit);

  const result = BFS(begin);

  if (result === false) {
    answer = 0;
  } else {
    answer = result;
  }

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
      startNode = idx;
      lastIndex = queue.length - 1;

      for (let i = startNode; i <= lastIndex; i++) {
        const x = queue[i];
        idx++;

        if (graph.has(x)) {
          const xFriends = graph.get(x);

          console.log("xFriends : ", xFriends);

          if (xFriends.length > 0) {
            for (let j = 0; j < xFriends.length; j++) {
              const y = xFriends[j];
              if (y === target) {
                flag = true;
                return times;
              }
              if (willVisit.get(y) === false) {
                queue.push(y);
                willVisit.set(y, true);
              }
            }
          }
        }
      }
      times++;
    }

    return false;
  }

  return answer;
}
