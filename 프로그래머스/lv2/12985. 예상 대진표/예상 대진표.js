function solution(n, a, b) {
  var answer = 0;

  let cnt = 1;

  while (true) {
    if (a % 2 === 0 && a - b === 1) {
      answer = cnt;
      break;
    } else if (b % 2 === 0 && b - a === 1) {
      answer = cnt;
      break;
    }

    a = Math.floor((a + 1) / 2);
    b = Math.floor((b + 1) / 2);

    cnt++;
  }

  return answer;
}

// 문제 풀이 접근 방식

// 과정1. a와 b가 현재 서로 대결상대인지 판단한다.

// 과정1-1. a와 b가 대결 상대인 경우
// 1,2  3,4  5,6 처럼 값이 1차이인 경우이고,
// 4,5 는 값이 1차이가 나더라도, 4는 3과 붙고, 5는 6과 붙는 점을 착안하여
// a와 b 중에서 하나가 짝수 값일 때, 다른 쪽의 값이 짝수 값 - 1 인지 체크하면 된다.

// 과정1-2. a와 b가 대결 상대가 아닌 경우
// 1-1의 조건에 만족하지 않은 경우 대결 상대가 아니다.
// 대결 상대가 아닌 경우 a와 b를 다음 라운드로 진출시킨다. (문제 조건에 따라 a와 b는 항상 이긴다.)

// 과정2. 다음 라운드 진출 시 번호 배정하기

// N번째 선수는 다음 라운드 진출 시, (N+1)/2번을 받게된다.
// ( ex) 3번 선수 => (3+1)/2 = 2
// 10번 선수 => (10+1)/2 = 5 )

// 따라서 a와 b의 다음 라운드에서의 번호를 구한 뒤, 다시 과정1을 수행하면 된다.
