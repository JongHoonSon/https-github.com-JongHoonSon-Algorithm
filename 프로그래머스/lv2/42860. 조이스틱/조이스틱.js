function solution(name) {
  var answer = 0;

  let haveToChange = 0;

  let changeAlphaCnt = 0;

  for (let i = 0; i < name.length; i++) {
    if (name[i] !== "A") {
      haveToChange++;

      const up = name.charCodeAt() - "A".charCodeAt();
      const down = "Z".charCodeAt() + 1 - name.charCodeAt();

      if (up >= down) {
        changeAlphaCnt = changeAlphaCnt + down;
      } else {
        changeAlphaCnt = changeAlphaCnt + up;
      }
    }
  }

  let times = [];

  console.log("haveToChange", haveToChange);

  if (name[0] === "A") {
    BT(0, 0, 0);
  } else {
    BT(1, 0, 0);
  }

  function BT(step, index, time) {
    if (step === haveToChange) {
      times.push(time);
      return;
    }
    let leftIndex = index === 0 ? name.length - 1 : index - 1;
    if (name[leftIndex] === "A") {
      BT(step, leftIndex, time + 1);
    } else {
      BT(step + 1, leftIndex, time + 1);
    }

    let rightIndex = index === name.length - 1 ? 0 : index + 1;
    if (name[rightIndex] === "A") {
      BT(step, rightIndex, time + 1);
    } else {
      BT(step + 1, rightIndex, time + 1);
    }
  }

  console.log("times : ", times);

  let minMove = Math.min(...times);

  console.log("minMove : ", minMove);

  answer = changeAlphaCnt + minMove;

  return answer;
}
