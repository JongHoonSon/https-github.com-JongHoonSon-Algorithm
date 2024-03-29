function solution(a) {
  let answer = -1;
  let Cnt = Array(a.length + 1).fill(0);

  // a배열의 원소의 등장횟수를 Cnt에 저장
  // (a배열의 i번째 원소의 값 a[i]를 index로 하는
  // Cnt 배열 상의 값을 1 늘림)
  for (let i = 0; i < a.length; i++) Cnt[a[i]]++;

  // Cnt를 반복하면서
  for (let i = 0; i < Cnt.length; i++) {
    // i가 a에서 등장한 적이 없으면, 넘어감
    if (Cnt[i] === 0) continue;
    if (Cnt[i] <= answer) continue;

    let Result = 0;

    // 찾은 i는 문제의 조건인 교집합의 원소로 쓰임

    // a배열에 대해 탐색
    for (let j = 0; j < a.length - 1; j++) {
      // j번째 값과 j+1번째 값을 확인하여 스타수열이 될 수 없는 경우면 넘어감
      // (해당 값을 삭제한 부분수열인 것처럼 동작)

      // 경우1. 둘 중에 교집합의 원소인 i가 없을 경우
      if (a[j] != i && a[j + 1] != i) continue;

      // 경우2. 두 값이 같은 경우
      // (i가 아니면서 같은 경우는 위에서 걸러졌으므로
      // 여기서 실질적으로 거르는 것은 i가 2번 등장한 경우를 의미)
      if (a[j] == a[j + 1]) continue;

      // 위의 조건문에 걸리지 않았다면, j번째 수와 j+1번째 수로
      // 스타수열에서 사용되는 집합을 만들 수 있음

      // 집합의 수 +1
      Result++;

      // j와 j+1번째를 썼으므로 다음번에 j+2와 j+3를 확인하기 위해
      // for문의 j++ 말고도 한번 j++를 시켜줌
      j++;
    }

    // 최종적으로 가장 긴 스타 수열을 출력하면 됨.
    answer = Math.max(answer, Result);
  }

  // answer는 가장 큰 Result값이고, Result는 2개의 원소로 이루어진 집합의 갯수이므로
  // 총 원소의 갯수는 집합의 갯수인 Result의 * 2임
  return answer * 2;
}

// 후기

// 나는 존재할 수 있는 값의 범위인 a.length에 대해 반복하며
// 각 값을 교집합의 원소로 하는 스타수열을 일일히 계산하였는데,
// a.length가 최대 50만개이므로 50만 x 50만 = 250억으로 시간초과가 발생하였다.
// 따랏서 구글링을 통해 답을 찾았다.

// 위의 로직도 내가 짠 것과 별반 다를 것이 없지만,
// 맨 처음 Cnt배열의 각 index에 해당 index 값의 등장 횟수를 기록한다는 차이가 있다.
// (Cnt[i]는 i의 등장 횟수)

// 짐작한 바로는 Cnt[i]가 0일 경우 continue하는데, 이것이 도움이 되는 것 같다.
// 50만 x 50만은 똑같으나 바깥쪽 50만에서 값을 체크하고 그냥 넘어가는게 있어서
// 일일히 확인하는 내가 짠 로직보다 빠르게 동작하는 것 같다.

// 문제 풀이 접근 방식
