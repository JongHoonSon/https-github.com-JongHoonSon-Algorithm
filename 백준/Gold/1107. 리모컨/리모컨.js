var fs = require("fs");
var inputs = fs.readFileSync("./dev/stdin").toString().split("\n");

// 수빈이가 틀려고 하는 채널 번호
const targetNum = +inputs[0];

// 고장난 버튼의 수
const brokenBtnNum = +inputs[1];

// 고장난 버튼을 담은 배열
let brokenBtnArray = [];
if (brokenBtnNum >= 2) {
  brokenBtnArray = inputs[2]
    .trim()
    .split(" ")
    .map((v) => +v);
} else if (brokenBtnNum >= 1) {
  brokenBtnArray.push(+inputs[2]);
}

// console.log(targetNum);
// console.log(brokenBtnNum);
// console.log(brokenBtnArray);

// targetNum 보다 밑의 채널에서 접근하였을 때 차이가 가장 적게나는 채널 번호
let lowerMinNum = -Infinity;

let i = 0;
let hasBrokenBtn;

// i를 0부터 tragetNum-1 까지 탐색하면서 만일 채널 번호 i에 고장난 버튼의 숫자가 포함되어 있으면, 해당 채널은 버튼으로 틀 수 없으므로 제외함
while (i !== targetNum) {
  hasBrokenBtn = false;
  for (let j = 0; j < brokenBtnArray.length; j++) {
    if (i.toString().indexOf(brokenBtnArray[j]) !== -1) {
      hasBrokenBtn = true;
      break;
    }
  }

  // 고장난 버튼을 포함하지 않는 채널 번호는 틀 수 있으므로 lowerMinNum에 저장
  if (!hasBrokenBtn) {
    lowerMinNum = i;
  }
  i++;
}

// 1부터 9까지의 버튼이 모두 고장났는지 확인하는 로직
// -> 만일 1부터 9까지 버튼이 모두 고장났을 경우,
// 번호를 누르는 방식으로 특정 채널을 틀 수 없으므로, +- 버튼으로만 채널을 틀 수 있음

// -> 0번 버튼은 넣어도되고 안넣어도 됨, 0번 버튼으로는 어차피 0번 채널밖에 틀 수 없기 때문,
// 0번 채널은 이미 위에서 lowerMinNum을 구하는 과정에서 탐색했음
let oneToNineBtnsAreBroken;
for (let i = 1; i < 10; i++) {
  oneToNineBtnsAreBroken = true;
  if (brokenBtnArray.includes(i)) {
    continue;
  } else {
    oneToNineBtnsAreBroken = false;
    break;
  }
}

// targetNum 보다 위의 채널에서 접근하였을 때 차이가 가장 적게나는 채널 번호
let higherMinNum = Infinity;

// 1부터 9까지의 버튼이 모두 고장났을 경우 위에서 접근하는 방식으로 찾을 수 없음 (아무 채널로도 이동할 수 없기 때문에)
if (!oneToNineBtnsAreBroken) {
  i = targetNum + 1;

  // 최대 50만의 채널이 있기 때문에 백만 단위의 채널에서 접근할 수 도 있음, 따라서 천만으로 설정
  // 꼭 천만이어야 하는 것은 아닌듯하지만, 천만일 경우 시간 초과가 발생하지 않기 때문에 이렇게 설정함
  while (i < 10000000) {
    hasBrokenBtn = false;
    for (let j = 0; j < brokenBtnArray.length; j++) {
      // console.log("brokenBtnArray[j]", brokenBtnArray[j]);
      if (i.toString().indexOf(brokenBtnArray[j]) !== -1) {
        hasBrokenBtn = true;
        break;
      }
    }
    if (!hasBrokenBtn) {
      higherMinNum = i;
      break;
    }
    i++;
  }
}

let canAccessDirectly = false;

// targetNum을 바로 틀 수 있는 경우(= targetNum을 트는데 필요한 버튼이 아무것도 고장나지 않은 경우)
// console.log("brokenBtnArray.length", brokenBtnArray.length);
for (let j = 0; j < brokenBtnArray.length; j++) {
  // console.log("targetNum.toString()", targetNum.toString());
  // console.log("brokenBtnArray[j]", brokenBtnArray[j]);
  if (targetNum.toString().indexOf(brokenBtnArray[j]) !== -1) {
    canAccessDirectly = true;
    break;
  }
}

// targetNum을 바로 틀 수 있는 경우에는 targetNum의 길이가 버튼을 누르는 횟수가 된다.
// 예를들어 1234 채널은 버튼 1,2,3,4를 눌러야하므로 버튼을 누르는 총 횟수는 4번이다.
let onlyNumberBtn = Infinity;
if (!canAccessDirectly) {
  onlyNumberBtn = targetNum.toString().length;
}

// 현재 수민이가 보고있는 100번 채널에서 +,- 버튼만을 이용해 이동하는 방법
let onlyPlusMinusBtn = targetNum - 100 > 0 ? targetNum - 100 : 100 - targetNum;

// console.log("onlyNumberBtn \t: ", onlyNumberBtn);
// console.log("onlyPlusMinusBtn: ", onlyPlusMinusBtn);
// console.log("lowerMinNum \t: ", lowerMinNum);
// console.log("higherMinNum \t: ", higherMinNum);
// console.log('--------');

// 결과는

// 숫자 버튼으로 눌러 바로 트는 방식
// +,-로만 이동해서 트는 방식
// 가장 가까운 윗 채널에서 접근하는 방식
// 가장 가까운 아래 채널에서 접근하는 방식

// 중에서 가장 작은 값을 취하면 된다.

const result = Math.min(
  onlyNumberBtn,
  onlyPlusMinusBtn,
  higherMinNum - targetNum + higherMinNum.toString().length,
  targetNum - lowerMinNum + lowerMinNum.toString().length
);

console.log(result);

// 후기 : 많은 함정이 있는 문제였다. 푸는데만 약 3~4시간 소요되고 검토 과정도 오래 걸렸다.
//     최종적으로 코드를 정리하였다. 많은 풀이를 보았는데 좋은 풀이가 많이 보였다.
//     나는 현재 위에서 접근하는 방식을 Infinity, 밑에서는 -Infinity로 접근하고 있는데
//     target+1 에서 올라가고, target-1 에서 내려가는 방식으로 했다면 더욱 편했을 것 같다.
//     하지만 기본적인 체크 사항은 똑같으므로 별 차이는 없다.
