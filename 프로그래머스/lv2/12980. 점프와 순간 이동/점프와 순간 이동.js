function solution(n) {
  var ans = 0;

  let cnt = 0;

  while (n !== 0) {
    if (n % 2 === 0) {
      n = n / 2;
    } else {
      cnt++;
      n = n - 1;
    }
  }

  ans = cnt;

  return ans;
}
