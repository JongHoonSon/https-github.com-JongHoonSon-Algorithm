function solution(numbers) {
  let answer = [];

  for (let i = 0; i < numbers.length; i++) {
    let current = numbers[i];

    if (current % 2 === 0) {
      // 숫자가 짝수일 때
      answer.push(current + 1); // 1을 더한 값을 answer에 추가한다.
    } else {
      // 숫자가 홀수일 때
      current = "0" + current.toString(2);

      let totalLength = current.length;

      // 뒤에서부터 앞으로 탐색
      for (let j = totalLength - 1; j >= 0; j--) {
        // j번째 수가 0인지 확인
        if (+current[j] === 0) {
          // 0을 찾았다면, 01을 10으로 변경함
          answer.push(
            parseInt(
              current.substring(0, j) +
                "10" +
                current.substring(j + 2, totalLength),
              2
            ) // 01을 제거하고 10을 넣어 해당 이진수를 숫자로 변환
          );
          break;
        }
      }
    }
  }

  return answer;
}

// 후기

// 구현 방식으로 문제를 풀었지만, 11개의 테스트 케이스 중 마지막 2개가 시간초과가 발생했다.
// 구글링을 통해 찾아보니 이 문제는 구현 문제가 아닌, 패턴을 찾는 수학 문제에 가깝다.

// 문제 풀이 접근 방식

// 이 문제는 문제에서 주어지는 number[i]의 값인 x가
// 짝수인 경우와 홀수인 경우로 나눠서 풀 수 있다.

// 1) x가 짝수인 경우
// 짝수를 2진수로 나타내면 마지막 비트의 값이 0이다. (ex) 1101100 => 짝수)
// 따라서 x에 +1을 더한 x+1를 2진수로 표현했을 때, 마지막 비트의 값이 1이므로
// x와 값이 1차이나는 가장 작은 수이면서 비트 또한 마지막 비트 1개만 차이나므로
// 문제에서 찾는 f(x)의 값은 x+1이 된다.

// 2) x가 홀수인 경우
// 홀수를 2진수로 나타내면 마지막 비트의 값이 1이다.
// 따라서 2진수 문자열의 맨 뒤에서부터 앞쪽으로 탐색하면서
// 0을 처음으로 찾았을 때, 해당 0의 위치의 바로 뒤에는 1이 존재한다.
// ex) '0'1, '0'11, 01'0'1 등 홀수를 2진수로 나타냈을 경우
// 뒤에서 부터 0을 처음 찾았을 때 그 바로 뒤의 값은 1이다.

// 만약 0을 찾았다면 2진수는 ....01.... 일 것이고
// 이를 ....10.... 으로 변경하면 단 2개의 비트만이 바뀐 것이고,
// 해당 2진수를 10진수로 변환하면 문제의 조건을 만족하는 f(x) 값을 찾게 된다.
