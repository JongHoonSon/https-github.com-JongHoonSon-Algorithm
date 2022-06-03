function solution(nums) {
  var answer = 0;

  if (nums.length === 2) {
    return 1;
  }

  let selected = [nums[0]];

  let totalCnt = nums.length / 2;

  let cnt = 1;

  for (let i = 1; i < nums.length; i++) {
    if (selected.includes(nums[i]) === true) {
      continue;
    } else {
      selected.push(nums[i]);
      cnt++;

      if (cnt === totalCnt) {
        break;
      }
    }
  }

  answer = selected.length;

  return answer;
}
