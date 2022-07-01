function solution(clothes) {
  var answer = 0;

  let map = new Map();

  // 1. 옷의 종류를 key로 갖고,
  // 옷의 종류 별로 옷의 갯수를 value로 갖는
  // Map을 생성함

  clothes.forEach((info) => {
    let [name, type] = info;

    if (map.has(type)) {
      map.set(type, map.get(type) + 1);
    } else {
      map.set(type, 1);
    }
  });

  // 2. Map을 Array로 변환한 후,
  // 각 종류에 해당하는 옷의 갯수를 서로 곱한 값에서
  // 옷을 아무것도 입지 않은 경우 한 가지를 뺌

  const arr = Array.from(map, ([name, value]) => ({ name, value }));

  let sum = 1;

  for (let i = 0; i < arr.length; i++) {
    sum *= arr[i].value + 1;
  }

  answer = sum - 1;

  return answer;
}
