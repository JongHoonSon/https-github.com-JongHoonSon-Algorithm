function solution(n) {
  var answer = 0;

  let sqrt = Math.ceil(Math.sqrt(n));

  let isPrime = new Array(n + 1).fill(true);

  for (let i = 2; i <= sqrt; i++) {
    if (isPrime[i] === true) {
      let m = 2;
      while (m * i <= n) {
        isPrime[m * i] = false;
        m++;
      }
    }
  }

  let cnt = 0;
  for (let i = 2; i <= n; i++) {
    if (isPrime[i] === true) {
      cnt++;
    }
  }

  answer = cnt;

  return answer;
}
