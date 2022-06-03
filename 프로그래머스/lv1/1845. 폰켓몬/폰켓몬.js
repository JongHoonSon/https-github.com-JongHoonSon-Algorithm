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

// 문제 풀이 접근 방식

// 총 n개의 포켓몬 중에서 n/2개를 선택할 수 있고,
// 최대한 다른 종류의 포켓몬을 골라야하기 때문에
// 포켓몬이 들어있는 nums 배열의 맨 앞부터 맨 뒤까지 탐색하면서
// 선택된 포켓몬 배열에 없는 종류의 포켓몬이 등장할 경우,
// 해당 포켓몬을 선택된 포켓몬 배열에 추가한다.

// 반복문은 다음 두 가지 경우 종료되는데,

// 1. n/2개의 포켓몬을 선택한 경우 => 포켓몬 종류가 매우 다양하여 n/2개의 종류의 선택한 경우이다.

// 2. 반복문이 끝난 경우 => 포켓몬의 종류가 n/2개 미만이어서, 포켓몬의 종류가 총 cnt가지인 경우이다.
// 2번의 경우 경우 n/2개의 포켓몬을 선택하지 못하였지만,
// n/2개의 포켓몬을 선택하기 위해 추가로 포켓몬을 더 선택하더라도,
// 기존의 선택했던 종류의 포켓몬을 또 선택하는 방법 밖에는 없으므로
// 포켓몬의 종류는 그대로 cnt가지이다.
