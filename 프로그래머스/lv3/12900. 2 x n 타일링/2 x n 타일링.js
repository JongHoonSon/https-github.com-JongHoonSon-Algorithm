function solution(n) {
  let memo = new Array(n + 1);

  memo[1] = 1;
  memo[2] = 2;

  for (let i = 3; i <= n; i++) {
    memo[i] = (memo[i - 1] + memo[i - 2]) % 1000000007;
  }

  return memo[n];
}
