function solution(n) {
  var answer = 0;

  // biggerNum은 n보다 큰 자연수를 의미
  let biggerNum = n;

  // n을 2진수로 변환하였을 때의 1의 갯수를 저장할 변수
  let cnt1 = 0;

  // n이 1이면, 2진수로 변환하였을 때 1의 갯수는 1
  if (n === 1) {
    cnt1 = 1;

    // n이 2이상이면, n이 1이 될 때까지 2로 나누면서
    // 2진수의 1의 갯수를 셈
  } else {
    while (n !== 1) {
      if (n % 2 === 1) {
        cnt1++;
      }
      n = Math.floor(n / 2);
    }
  }

  // biggerNum을 1씩 증가시키면서
  // 각 biggerNum을 2진수로 변환하였을 때 1의 갯수를 셈
  while (true) {
    biggerNum++;
    let cnt2 = 0;
    let calcN = biggerNum;
    while (calcN !== 1) {
      if (calcN % 2 === 1) {
        cnt2++;
      }
      calcN = Math.floor(calcN / 2);
    }

    // 만약 2진수 n의 1의 갯수와 2진수 biggerNum의 1의 갯수가 같으면
    if (cnt1 === cnt2) {
      // 해당 수를 answer에 저장하고 종료함
      answer = biggerNum;
      break;
    }
  }

  return answer;
}

// 문제 풀이 접근 방식

// 입력으로 주어진 n을 2진수로 변환하였을 때의 1의 갯수를 저장하고,
// n보다 큰 자연수 biggerNum에 대해
// 각 biggerNum을 2진수로 변환하였을 때 1의 갯수와
// n을 2진수로 변환하였을 때의 1의 갯수를 비교해서
// 1의 갯수가 같으면 해당 biggerNum을 answer에 저장하고 출력한다.
