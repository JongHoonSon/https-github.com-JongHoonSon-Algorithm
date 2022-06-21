function solution(progresses, speeds) {
  var answer = [];

  let deployedStack = [];

  while (deployedStack.length !== progresses.length) {
    for (let i = 0; i < progresses.length; i++) {
      progresses[i] += speeds[i];
    }

    for (let i = 0; i < progresses.length; i++) {
      if (deployedStack.includes(i) === true) {
        continue;
      } else {
        if (progresses[i] >= 100) {
          let cnt = 0;

          deployedStack.push(i);
          cnt++;

          for (let j = i + 1; j < progresses.length; j++) {
            if (!deployedStack.includes(j) && progresses[j] >= 100) {
              deployedStack.push(j);
              cnt++;
            } else {
              break;
            }
          }
          answer.push(cnt);
        }
        break;
      }
    }
  }

  return answer;
}
