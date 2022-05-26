function solution(arr) {
  var answer = 0;

  // arr 배열에서 가장 큰 수를 뽑는다.
  let maxNum = Math.max(...arr);

  console.log(maxNum);

  let i = 2;

  // arr의 모든 원소의 최소공배수를 찾을 때 까지 반복
  while (true) {
    // maxNum의 배수를 nTimesMaxNum를 저장
    let nTimesMaxNum = maxNum * i;

    // 만약 모든 원소가 nTimesMaxNum의 약수인지의 여부를 저장하기 위한 변수
    // 기본값 true
    let allPass = true;
    for (let num of arr) {
      // 만약 arr의 원소 중에서 num으로 나눠 떨어지지 않는 수가 있다면
      if (nTimesMaxNum % num !== 0) {
        // allPass를 false처리하고 종료함
        allPass = false;
        break;
      }
    }

    // 만약 모든 원소가 nTimesMaxNum의 약수라면
    if (allPass) {
      // answer에 모든 원소의 최소공배수인 nTimesMaxNum를 저장하고 종료함
      answer = nTimesMaxNum;
      break;
    }

    i++;
  }

  return answer;
}
