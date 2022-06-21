function solution(clothes) {
  var answer = 0;

  let map = new Map();

  clothes.forEach((info) => {
    let [name, type] = info;

    if (map.has(type)) {
      map.set(type, map.get(type) + 1);
    } else {
      map.set(type, 1);
    }
  });

  const arr = Array.from(map, ([name, value]) => ({ name, value }));

  let sum = 1;

  for (let i = 0; i < arr.length; i++) {
    sum *= arr[i].value + 1;
  }

  answer = sum - 1;

  return answer;
}
