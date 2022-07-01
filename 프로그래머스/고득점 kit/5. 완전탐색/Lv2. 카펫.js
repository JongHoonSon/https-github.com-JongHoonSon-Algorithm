function solution(brown, yellow) {
  var answer = [];

  let yellowWidth;
  let yellowHeight;

  // 1. 알고 있는 것은 yellow 카펫의 격자의 수 이므로
  // 카펫의 크기를 유추하기 위해
  // 이중 반복문을 이용해 i*j 카펫의 크기를 만듬
  for (let i = 1; i <= yellow; i++) {
    for (let j = 1; j * i <= yellow; j++) {
      // 2. 만약 yellow 카펫에 쓰이는 격자의 갯수가 yellow의 갯수와 같다면
      // (= 이론 상 가능한 구조)
      if (i * j === yellow) {
        yellowWidth = i;
        yellowHeight = j;
      }

      // 3. 해당 yellow 카펫을 감싸는 brown 카펫을 만들고,
      // 해당 brown 카펫에 쓰이는 격자의 갯수가 brown 갯수와 같으면
      // => 정답을 찾음
      if ((yellowWidth + 2) * 2 + yellowHeight * 2 === brown) {
        if (yellowWidth < yellowHeight) {
          answer = [yellowHeight + 2, yellowWidth + 2];
        } else {
          answer = [yellowWidth + 2, yellowHeight + 2];
        }
      }
    }
  }

  return answer;
}
