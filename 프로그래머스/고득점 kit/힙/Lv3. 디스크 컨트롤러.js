function solution(jobs) {
  var answer = 0;

  let totalReqToEnd = 0;

  let stack = [];
  let nowTime = -1;
  let finishedJobCnt = 0;
  let workFlag = false;
  let workEndTimer = 0;

  // 끝낸 작업의 수가 전체 작업의 수와 일치할 때까지 반복
  while (finishedJobCnt !== jobs.length) {
    // 시간 증가
    nowTime++;

    // 현재 작업 중이라면
    if (workFlag === true) {
      // 작업 시간 감소
      workEndTimer--;

      // 남은 작업 시간이 0이되면
      if (workEndTimer === 0) {
        // 현재 작업 중인 것이 끝났으므로, workFlag를 false로 변경
        workFlag = false;

        // 끝낸 작업의 수 1증가
        finishedJobCnt++;
      }
    }

    // 현재 시간에 요청되는 job을 찾아 stack에 넣기
    jobs.forEach((job) => {
      let [reqTime, totalTime] = job;

      if (reqTime === nowTime) {
        stack.push({ reqTime, totalTime });
      }
    });

    // console.log(stack);

    // stack 정렬(작업 시간 별로 내림차순, stack의 가장 끝에 있는 작업의 작업 시간이 가장 짧음)
    if (stack.length > 0) {
      stack.sort((a, b) => {
        if (a.totalTime > b.totalTime) {
          return -1;
        } else if (a.totalTime < b.totalTime) {
          return 1;
        }
      });
    }

    // 현재 작업 중이 아니라면
    if (workFlag === false) {
      // stack에 들어 있는 작업이 있다면
      if (stack.length > 0) {
        // stack에서 끝에 들어 있는 작업(대기 중인 작업 중에서 작업 시간이 가장 짧은 작업)을 꺼내기
        let nextWork = stack.pop();

        // 해당 작업의 작업 시간을 workEndTimer로 설정
        workEndTimer = nextWork.totalTime;

        // 작업 여부를 true로 변경
        workFlag = true;

        // 해당 작업의 대기 시간과 작업 시간의 합을 totalReqToEnd에 기록함
        // totalReqToEnd는 전체 작업의 대기 시간과 작업 시간의 합
        totalReqToEnd += nowTime - nextWork.reqTime + nextWork.totalTime;
      } else {
        continue;
      }
    }
  }

  answer = Math.floor(totalReqToEnd / jobs.length);

  return answer;
}
