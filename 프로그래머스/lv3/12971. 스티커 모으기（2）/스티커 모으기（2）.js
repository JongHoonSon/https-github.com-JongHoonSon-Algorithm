function solution(sticker) {
  var answer = 0;

  let results = [];

  // 만약 스티커가 3개 이하인 경우,
  // 하나를 선택할 경우 나머지를 선택하지 못하므로
  // sticker 중에서 가장 큰 값을 취한다.
  if (sticker.length <= 3) {
    answer = Math.max(...sticker);
    return answer;
  }

  // 스티커가 4개 이상인 경우,

  // 맨 처음 스티커를 선택하는 경우
  let memo = new Array(sticker.length).fill(0);

  memo[0] = sticker[0];
  memo[1] = sticker[0];

  // 맨 앞 스티커를 선택했으므로 마지막 스티커를 선택하지 못한다.
  // 따라서 범위를 마지막 스티커의 앞 스티커까지로 한다.
  for (let i = 2; i < memo.length - 1; i++) {
    memo[i] = Math.max(memo[i - 1], memo[i - 2] + sticker[i]);
  }

  console.log(memo);

  // 맨 처음 스티커를 선택하지 않는 경우
  // (처음 선택하는 스티커가 2번째가 될 수도 있고, 3번째가 될 수도 있고, 4번째가 될 수도 있고, ...)

  // ex) 1 1 100 1 1 100 이라면

  // memo[0] = 0 (선택 안함)
  // memo[1] = 1 (1번 선택 시)
  // memo[2] = 100 (2번 선택 시)
  // ...

  results.push(Math.max(...memo));
  memo = new Array(sticker.length).fill(0);

  memo[0] = 0;
  memo[1] = sticker[1];

  for (let i = 2; i < memo.length; i++) {
    memo[i] = Math.max(memo[i - 1], memo[i - 2] + sticker[i]);
  }

  results.push(Math.max(...memo));

  answer = Math.max(...results);

  return answer;
}

// 문제 풀이 접근 방식

// 맨 앞 요소를 선택하는 경우와, 선택하지 않는 경우로 나눠서 문제를 접근한다.
// memo의 i번째 요소는 memo의 i-2번째 요소의 값과 sticker의 i번째 요소의 합과
// memo의 i-1번째 요소의 값 중에서 큰 값을 취한다.
