function solution(n, k) {
  var answer = [];

  // 인덱스와 일치를 위해 k - 1로 초기화한다.
  let nth = k - 1;

  // 주어진 n을 이용하여 [1, 2, 3, 4, ..., n] 형태의
  // 배열을 만들어준다.
  const arr = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    arr[i] = i + 1;
  }

  while (arr.length) {
    if (nth === 0) {
      answer.push(...arr);
      break;
    }

    const fact = factorial(arr.length - 1);
    const index = Math.floor(nth / fact);
    nth = nth % fact;

    answer.push(arr[index]);
    arr.splice(index, 1);
  }

  return answer;
}

// n팩토리얼의 값을 돌려주는 함수
const factorial = (n) => {
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
};

// 후기

// BT를 이용해서 모든 순열을 찾고, 그 중 K번째 수열을 출력하는 방식으로 짰더니,
// 시간 초과 오류가 발생했다, BT를 최대 20!번 진행할 수 있기때문이었다.

// 따라서 K번째 수열을 찾는 방법을 구글링을 통해 알게 되었고,
// 팩토리얼을 이용함을 알 수 있었다.
