function solution(jobs) {
  var answer = 0;

  let totalReqToEnd = 0;

  let stack = [];
  let nowTime = -1;
  let finishedJobCnt = 0;
  let workFlag = false;
  let workEndTimer = 0;

  while (finishedJobCnt !== jobs.length) {
    // 시간 증가
    nowTime++;

    // 작업 시간 감소
    if (workFlag === true) {
      workEndTimer--;
      if (workEndTimer === 0) {
        workFlag = false;
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

    // stack 정렬
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
      // stack에서 마지막 작업(대기 중인 작업 중에서 작업 시간이 가장 짧은 작업)을 꺼내서 작업 수행
      if (stack.length > 0) {
        let nextWork = stack.pop();
        workEndTimer = nextWork.totalTime;
        workFlag = true;
        totalReqToEnd += nowTime - nextWork.reqTime + nextWork.totalTime;
      } else {
        continue;
      }
    }
  }

  answer = Math.floor(totalReqToEnd / jobs.length);

  return answer;
}
