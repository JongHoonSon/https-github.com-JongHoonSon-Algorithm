function solution(clothes) {
  var answer = 0;

  const clothMap = new Map();

  clothes.forEach(([name, type]) => {
    if (clothMap.has(type)) {
      clothMap.set(type, clothMap.get(type) + 1);
    } else {
      clothMap.set(type, 1);
    }
  });

  let totalCnt = 1;

  for (var cnt of clothMap.values()) {
    totalCnt = totalCnt * (cnt + 1);
  }

  answer = totalCnt - 1;

  return answer;
}
