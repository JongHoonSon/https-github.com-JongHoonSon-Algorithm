function solution(sizes) {
  var answer = 0;

  for (let i = 0; i < sizes.length; i++) {
    sizes[i].sort((a, b) => a - b);
  }

  let maxWidth = 0;
  let maxHeight = 0;

  for (let i = 0; i < sizes.length; i++) {
    if (maxWidth < sizes[i][0]) {
      maxWidth = sizes[i][0];
    }
    if (maxHeight < sizes[i][1]) {
      maxHeight = sizes[i][1];
    }
  }

  answer = maxWidth * maxHeight;

  return answer;
}
