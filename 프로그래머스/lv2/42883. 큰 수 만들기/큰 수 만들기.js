function solution(number, k) {
  let answer;

  // number의 첫번째 수를 갖고 있는 newNumber 배열 생성
  const newNumber = [number[0]];

  // 1번 index부터 마지막 index까지 반복
  for (let i = 1; i < number.length; i++) {
    while (k !== 0) {
      // 만약 number의 i번 index의 수가 현재 newNumber의 마지막 index의 수보다 크면
      // => newNumber의 마지막 index의 수를 버리고,
      // 버릴 수 있는 기회의 수인 k를 -- 시킴
      if (newNumber[newNumber.length - 1] < number[i]) {
        newNumber.pop();
        k--;
      } else {
        break;
      }
    }

    // number의 i번 index의 수를 newNumber에 넣음
    newNumber.push(number[i]);
  }

  // number가 모두 같은 수로 이루어진 문자열일 경우 ex) 77777
  // newNumber[newNumber.length - 1] < number[i] 조건문에 걸리지 않고,
  // newNumber를 pop하지 않게되, 그대로 77777이 나온다.
  // 따라서 문제에서 요구한 길이인 number.length - k로 문자열을 강제로 잘라준다.
  answer = newNumber.join("").slice(0, number.length - k);

  return answer;
}

// 문제 풀이 접근 방식

// number 문자열에서 k개의 문자를 제거해서 가장 큰 수를 만드는 방법은
// 특정 수를 제거 할 때, 앞쪽에 있는 수일수록 영향이 더 크다는 점을 고려하면,
// 앞에서 큰 수를 취할수 있는 상황이 있다면 큰 수를 취하는게 유리하다.
// ex) 12341에서
//     맨 앞을 제거한 23412 가
//     맨 뒤를 제거한 1234 보다 크다.
//     즉, 앞에서 큰 수를 취해야 이득

// 따라서 number 문자열의 맨 앞에서부터 뒤로 이동하면서
// i번째 수보다 i+1번째 수가 크면, answer에서 i번째 수를 제거한다.
// 위의 과정을 k번 제거할 때 까지 반복한다.
