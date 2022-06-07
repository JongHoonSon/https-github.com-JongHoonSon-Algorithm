function solution(skill, skill_trees) {
  var answer = -1;

  // 스킬을 배워야하는 순서
  let skillArr = skill.split("");
  let cnt = 0;

  console.log(skillArr);

  // 모든 스킬트리에 대해 반복
  for (let i = 0; i < skill_trees.length; i++) {
    // 각 스킬트리를 저장
    let skillTreeArr = skill_trees[i].split("");

    let idx = 0;
    let flag = true;

    for (let j = 0; j < skillTreeArr.length; j++) {
      // 만약 스킬트리의 j번째 스킬이 skillArr에 들어 있지 않다면,
      // 순서에 상관없이 그냥 배워도 되는 스킬이므로 넘어감(문제 조건)
      if (!skillArr.includes(skillTreeArr[j])) {
        continue;
      }

      // 만약 스킬트리의 j번째 스킬이 skillArr에 들어 있다면,

      // j번째 스킬이 스킬 배우는 순서의 idx번째 스킬이 맞는지 확인
      if (skillTreeArr[j] === skillArr[idx]) {
        // 맞다면, idx를 1 증가시키고, 다음 스킬로 넘어감
        idx++;
        continue;
      } else {
        // 맞지 않다면, flag를 false로 변경하고
        // 현재 스킬트리는 맞는 순서대로 짜여진 스킬트리가 아니므로 현재 스킬트리에 대한 확인을 종료함
        flag = false;
        break;
      }
    }

    // 만약 스킬트리의 확인이 종료되었는데, flag가 true라면
    // 맞는 스킬 트리이므로 cnt를 1 증가시킴
    if (flag === true) {
      cnt++;
    }
  }

  answer = cnt;

  return answer;
}

// 문제 풀이 접근 방식

// 먼저 문제에서 주어진 스킬을 배워야하는 순서를 skillArr에 저장한 후,
// 유저가 사용한 스킬트리인 skill_tree를 반복하면서 각 스킬트리를 skillTreeArr에 저장한다.

// skillTreeArr에 들어있는 스킬들을 반복문으로 하나씩 확인하면서
// 특정 스킬이 스킬을 배워야하는 순서인 skillArr 안에 들어있는 스킬이라면,
// skillArr배열 상에서의 index 순서대로 등장했는지 체크하기위해 index값을 갖고 있는 idx를 이용해서
// 해당 스킬이 skillArr[idx]에 있는 스킬과 같은지 확인한다.

// 정상적인 스킬트리라면서 index와 idx의 범위는 '0 ~ skillArr의 길이-1' 이고, 같은 값을 갖고 있어야 한다.

// 두 값이 같으면, 스킬을 배워야하는 순서를 지키면서 스킬트리를 만든 것이므로 계속해서 반복문을 수행하고,
// 두 값이 다르면, 스킬을 배워야하는 순서를 어긴 것이므로 다음 스킬트리로 넘어간다.
