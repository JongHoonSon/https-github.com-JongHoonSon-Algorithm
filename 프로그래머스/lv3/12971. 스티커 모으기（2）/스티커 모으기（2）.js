function solution(sticker) {
  var answer = 0;

  let results = [];

  if (sticker.length <= 3) {
    answer = Math.max(...sticker);
    return answer;
  }

  let memo = new Array(sticker.length).fill(0);

  memo[0] = sticker[0];
  memo[1] = sticker[0];

  for (let i = 2; i < memo.length - 1; i++) {
    memo[i] = Math.max(memo[i - 1], memo[i - 2] + sticker[i]);
  }

  console.log(memo);

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
