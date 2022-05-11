function solution(progresses, speeds) {
  var answer = [];

  // 아직 배포를 못한 앞선 작업을 담을 배열
  let stack;

  // 배포를 할 예정인 작업을 담을 배열
  let toDeploy;

  // 각 작업의 배포 여부를 기록하는 배열
  let deployed = new Array(progresses.length).fill(false);

  // 반복문의 종료여부를 결정할 flag 변수
  let endFlag = false;

  // endFlag의 값이 false이면 반복함
  while (endFlag === false) {
    // 각 작업의 값 progresses[i]에 당일 작업 분량인 speeds[i] 만큼을 더함
    for (let i = 0; i < progresses.length; i++) {
      progresses[i] = progresses[i] + speeds[i];
    }

    stack = [];
    toDeploy = [];

    // 모든 작업 중에서
    for (let i = 0; i < deployed.length; i++) {
      // 아직 배포되지 않은 작업이 있고,
      if (deployed[i] === false) {
        // 해당 작업이 오늘 마무리 되었다면
        if (progresses[i] >= 100) {
          // 그리고 앞선 작업 중에 아직 마무리된 작업이 없다면
          if (stack.length === 0) {
            // 배포 예정 목록에 넣고, 배포 여부를 true로 변경함
            toDeploy.push(i);
            deployed[i] = true;
          }
          // 해당 작업이 오늘 마무리되지 않은 경우
        } else {
          // 마무리되지 않은 앞선 작업을 넣어두는 stack에 넣음
          stack.push(i);
        }
      }
    }

    // 오늘 배포할 수 있는 작업이 있으면
    // 해당 배포의 갯수만큼 answer에 넣음
    if (toDeploy.length > 0) {
      answer.push(toDeploy.length);
    }

    endFlag = true;

    // 모든 작업이 배포되었는지 체크함
    for (let i = 0; i < deployed.length; i++) {
      // 하나라도 배포가 안되었다면
      if (deployed[i] === false) {
        // endFlag를 false로 변경함
        endFlag = false;
      }
    }
  }

  return answer;
}
