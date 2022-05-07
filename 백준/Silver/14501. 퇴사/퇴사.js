let fs = require("fs");
let input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const N = +input.shift();
const day = [];
const reward = [];
const memo = [];

for (let i = 0; i < N; i++) {
  day.push(+input[i].split(" ")[0]);
  reward.push(+input[i].split(" ")[1].trim());
  memo.push(0);
}

// console.log(N);
// console.log(day);
// console.log(reward);
// console.log(memo);

// 첫째날(0)부터 마지막 날(N-1) 까지 반복한다.
for (let i = 0; i < N; i++) {
  // 만약 i번째 날 day[i]만큼 걸리는 일이 N일 이후에 끝난다면
  // ex) 10일까지 다니는데 8일날 처리하는 일이 3일 걸리면 ok => 8, 9, 10에 처리
  //     10일까지 다니는데 8일날 처리하는 일이 4일 걸리면 x => 8, 9, 10, 11 -> 10일을 넘어감
  if (i + day[i] > N) {
    continue;
  }

  // 처리가능 한 일이라면
  // memo[i]에 오늘 처리할 일을 더함
  // memo[i]는 내가 이전까지 처리 가능한 일의 최댓값
  memo[i] = memo[i] + reward[i];

  // 그 후 오늘 받은 일이 끝나고 나서(i+day[i]일 부터)
  // 처리할 수 있는 모든 일에 대해
  for (let j = i + day[i]; j < N; j++) {
    // j요일에 상담을 진행하여 reward[j]를 받기 이전에
    // 수행할 수 있던 이전에 발생하는 상담들의 조합 중에서
    // 최대 보상값을 갖고 있는 memo[j]와

    // 오늘 내가 상담을 진행하여 받은 보상인 reward[i]와
    // i요일까지 받을 수 있는 최댓값인 memo[i]을 합한 값과 비교하여

    // 더 큰 값을 저장한다.

    // ex) 4번째 요일(오늘), 6번째 요일(미래) 라고 가정

    //     6번째 요일에는 원래 1, 3번째 요일의 상담을 진행하는 것이
    //     앞서서 진행할 수 있는 상담의 조합 중에 가장 큰 보상값을 갖는다고 하면
    //     memo[6]은 (1, 3)의 보상 값의 합을 갖고 있다.

    //     만약 4번째 요일(요일)에 처리한 진행 상담의 비용 reward[4]와
    //     원래 4번째 요일 이전까지 진행했던 상담(2)의 비용 memo[4]가
    //     20이라고 할 때,

    //     memo[6] 입장에서는
    //     보상이 15인 (1, 3)을 사전에 진행하는 것보다
    //     보상이 20인 (2, 4)를 사전에 진행하는 것이 더 나아
    //     memo[6]의 값을 20으로 갱신한다.

    //     이후 i가 6일 때, memo[6]에 당일 처리할 상담의 보상인 reward[6]을 더하고
    //     6번째 요일 이후에 추가로 진행할 수 있는 날의 memo 값을 갱신하면 된다.

    // (기존에 할 수 있었던 상담들의 최대 보상값과
    // 오늘까지 처리한 일의 최대 보상값 중 큰 것을 고름)
    memo[j] = Math.max(memo[j], memo[i]);
  }
}

console.log(Math.max(...memo));
