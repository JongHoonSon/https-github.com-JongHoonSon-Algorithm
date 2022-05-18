function solution(operations) {
  var answer = [];

  let queue = [];

  // 입력을 받는다.
  operations.forEach((el) => {
    const [operation, value] = el.trim().split(" ");

    // I일 경우, value를 queue에 push 한다.
    if (operation === "I") {
      queue.push(+value);
      queue.sort((a, b) => a - b);
      // D이고,
    } else {
      // value가 1일 경우
      if (value === "1") {
        // 최댓값을 삭제한다. (정렬되어 있으므로 배열의 맨 끝에서 pop한다.)
        queue.pop();

        // value가 -1일 경우
      } else if (value === "-1") {
        // 최솟값을 삭제한다. (정렬되어 있으므로 배열의 맨 앞에서 shift한다.)
        queue.shift();
      }
    }
  });

  // queue의 길이가 0이면, answer에 [0, 0]을 넣는다. (문제 조건)
  if (queue.length === 0) {
    answer = [0, 0];

    // queue의 길이가 1이상 이면, answer에 [최댓값, 최솟값]을 넣는다. (문제 조건)
  } else {
    answer = [queue[queue.length - 1], queue[0]];
  }

  return answer;
}

// 문제 풀이 접근 방식

// 입력으로 주어지는 값을 operation과 value로 구분하고
// operation이 I 이면 push,
// operation이 D 이고, value가 1 이면 최댓값 삭제(pop)
// operation이 D 이고, value가 -1 이면 최솟값 삭제(shift) 를 수행한다.

// 최솟값, 최댓값을 삭제하기 위해 매번 queue를 sorting한다.
// (원래는 Heap으로 해야하지만,
// 내장 함수인 sort를 이용해도 똑같이 시간복잡도 NxlogN이 나오기 때문에,
// 내장 함수 sort를 사용하였다.)
