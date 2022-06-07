function solution(skill, skill_trees) {
  var answer = -1;

  let skillArr = skill.split("");
  let cnt = 0;

  console.log(skillArr);

  for (let i = 0; i < skill_trees.length; i++) {
    let skillTreeArr = skill_trees[i].split("");

    let idx = 0;
    let flag = true;

    for (let j = 0; j < skillTreeArr.length; j++) {
      if (idx === skillArr.length) {
        break;
      }
      if (!skillArr.includes(skillTreeArr[j])) {
        continue;
      }
      if (skillTreeArr[j] === skillArr[idx]) {
        idx++;
        continue;
      } else {
        flag = false;
        break;
      }
    }

    if (flag === true) {
      cnt++;
    }
  }

  answer = cnt;

  return answer;
}
