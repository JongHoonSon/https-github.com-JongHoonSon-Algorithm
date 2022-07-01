function solution(progresses, speeds) {
  var answer = [];

  // 1. 배포 완료한 기능을 저장할 스택
  let deployedStack = [];

  // 2. 배포 완료한 기능의 갯수가 모든 기능의 갯수와 같지 않으면 반복
  // (같아지면 반복 종료)
  while (deployedStack.length !== progresses.length) {
    // 3. 모든 작업에 대해 반복하며 당일 처리할 수 있는 작업량만큼 증가시킴
    for (let i = 0; i < progresses.length; i++) {
      progresses[i] += speeds[i];
    }

    // 4. 모든 작업에 대해 반복하며,
    // 배포 완료하지 않은 작업 중에서
    // 우선 순위 상 맨 앞에 위치하는 작업의 진행도가 100이상이 되었는지 체크함
    // 만약 해당 작업의 진행도가 100이상이 되었다면,
    // 그 뒤 우선 순위를 갖는 작업 중에서 완료된 것과 함께 배포함
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
