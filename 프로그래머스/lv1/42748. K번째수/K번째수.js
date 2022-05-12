function solution(array, commands) {
  var answer = [];

  // commands의 모든 원소에 대해 반복
  commands.forEach((el) => {
    // i, j, k 값을 저장
    const i = el[0];
    const j = el[1];
    const k = el[2];

    // 인덱스가 아닌 순서상 i번째부터 j번째까지 자르기 위해
    // i-1번 인덱스부터 j-1번 인덱스까지 자름
    // (첫번째부터 다섯번째 => 0(1-1)번 인덱스부터 4(5-1)번 인덱스까지)
    let sliceArray = array.slice(i - 1, j);

    // console.log("sliceArray", sliceArray);

    // 오름차순으로 정렬함
    // 그냥 .sort() 만 쓸 경우 앞자리만 비교한다는 것에 주의
    sliceArray.sort((a, b) => a - b);

    // k번째 수를 answer에 push함
    answer.push(sliceArray[k - 1]);
  });

  return answer;
}

// 문제 풀이 접근 방식

// 주어진 문자열에 대해 인덱스 상 i-1번째부터 j-1까지 자른 후,
// 해당 문자열의 k-1번째 인덱스의 값을 출력하면 되는 쉬운 문제이다.
