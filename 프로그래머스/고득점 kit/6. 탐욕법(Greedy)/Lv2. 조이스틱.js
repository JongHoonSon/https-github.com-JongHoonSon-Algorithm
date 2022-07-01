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

// 후기

// 이 문제는 잘못 만들어진 문제이다.
// 이 문제는 유형이 그리디로 되어 있는데,
// 실제로는 그리디가 아닌 브루트 포스 문제이다.

// 이유는 이 문제가 그리디가 되기 위해서는 각 문자를 변경하는 과정에서
// 그 문자와 또 가장 가까운 문자를 바꾸고,
// 또 바꾼 문자와 가장 가까운 문자를 바꾸는 방식으로 했을 때
// 이동한 횟수가 가장 적게 나와야한다.

// 하지만 다음과 같은 경우에서는 꼭 가까운 문자를 바꾸는 것보다
// 당장은 좀 더 멀리 있는 문자를 바꾸더라도,
// 최종적으로 봤을 때 이동한 횟수가 더 줄어드는 경우가 있다.

// ex) 문자열이 BACAAAAAABAAAAB 처럼 있을 경우
// 0번 인덱스에서 시작했을 때, 제일 가까운 마지막 index의 B를 바꾸는 방식이 그리디인데,
// 이 경우의 최종 이동 횟수가
// 처음에 2번 인덱스인 C로 이동하는 것보다 높게 나온다.

// 따라서 나는 제출은 구글링해서 그리디 방식으로 했지만 (채점이 그리디만 되므로)
// 실제로는 BT를 수행해서 모든 경우의수를 따졌을 때 가장 적게 이동해도 되는 횟수를 구하고,
// 이후 모든 알파벳을 A에서 해당 알파벳으로 변환하는데 드는 횟수를 더한 값을
// 최종 정답으로 제출하였다.
