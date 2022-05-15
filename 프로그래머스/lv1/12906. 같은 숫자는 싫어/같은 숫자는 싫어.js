function solution(arr) {
  var answer = [];

  // 방금 찾은 수를 기록하는 prev 변수
  // 배열에서 같은 값이 나오는지 체크하는 용도로 사용함
  // 일단 arr 배열의 첫번째 값을 가짐
  let prev = arr[0];

  // arr 배열의 첫번째 값을 answer에 넣음
  answer.push(arr[0]);

  // arr을 forEach로 방문하면서
  // 이전에 찾은 값(prev)과 현재 찾은 값(el)이 갖지 않다면
  // answer에 현재 찾은 값(el)을 넣고, prev를 업데이트함
  arr.forEach((el) => {
    if (el !== prev) {
      prev = el;
      answer.push(el);
    }
  });

  return answer;
}
