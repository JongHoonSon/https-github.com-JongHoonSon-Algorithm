function solution(A, B) {
  var answer = 0;

  A.sort((a, b) => a - b);
  B.sort((a, b) => a - b);

  let sum = 0;

  for (let i = 0; i < A.length; i++) {
    let a = A[i];
    let b = B[B.length - i - 1];

    sum = sum + a * b;
  }

  answer = sum;

  return answer;
}

// 문제 풀이 접근 방식

// 입력으로 주어지는 두 배열을 오름차순으로 정렬하고
// 각 배열의 가장 큰 수와 가장 작은 수를 곱한 값을 누적해나가면
// 문제에서 요구하는 배열 A의 요소와 배열 B의 요소 중에서
// 한 요소를 꺼내 곱한 값의 합의 최솟값을 구할 수 있다.
