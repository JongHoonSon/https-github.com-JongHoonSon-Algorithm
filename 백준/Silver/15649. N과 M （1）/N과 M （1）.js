let fs = require('fs');
let input = fs.readFileSync('./dev/stdin').toString().trim().split(' ');

const N = +input[0];
const M = +input[1];

// 1부터 N까지의 수를 담은 배열
let arr = [];

// 1부터 N까지 현재 방문했던 곳을 true, 방문하지 않은 곳을 false로 갖는 배열
let check = [];

// 각 단게에서 탐색의 결과를 저장, 최종 답
let answer = []; 


// 먼저 arr와 check를 초기 값을 넣어줌,
// arr은 1부터 N까지의 수
// check는 false
for(let i=1; i<=N; i++) {
    arr.push(i);
    check.push(false);
}

// console.log(arr);
// console.log(check);

// BT 함수로 첫번째 문자부터 탐색 시작
// 빈 배열(함수 안에서 string이라고 읽히는)을 같이 전달 // 전역 변수로 선언해서 써도 됨.
// 같이 전달하는 배열의 index = 0에 들어가야 하는 값이므로
// 1이 아닌 0을 전달
BT(0, []);
console.log(answer.join('\n'));


function BT(step, string) {
    // 1. 종료 조건 파트
    // step를 step+1로 1씩 증가시켜 탐색을 진행한다.
    // step이 0일 경우 첫번째 문자, step이 1일 경우 두번째 문자 ....
    // 만약 M=3 이고, step 값이 3인 함수가 호출되었다면
    // 3번째 문자까지 모두 다 찾고 4번째 문자를 찾으려 하는 것이므로 (i번째 문자를 찾는 step 은 i-1임을 고려.)
    // 여태까지 찾았던 3개의 문자를 answer에 넣어준 후
    // return 으로 함수를 종료시켜준다.
    if(step===M) {
        answer.push(string.join(' '));
        return;
    }

    // 2. 각 단계 별 precess 파트
    // 함수 호출 1회당 1개의 단계가 진행된다.
    // 각 단계는 step+1 번째 문자를 찾는 과정을 진행한다.
    // 총 M개 문자로 이루어진 문자열을 만들어야 하므로 총 M단계까지 진행된다.

    // 각 단계에서는 arr에 들어있는 수를 선택할지 말지 결정해야 한다. (* 결정할때는 check 배열의 true, false를 참고)
    // 따라서 arr의 첫번째 index 0부터 마지막 index N-1까지 반목문으로 탐색한다.
    for(let i=0; i<N; i++) {

        // 2-1. 이미 선택된 적이 있는지 체크
        // 만일 i번째 index가 앞선 단계에서 선택되었다면 
        if(check[i] === true) {
            // 다음 index로 넘어간다.
            continue;
        }

        // 2-2. 선택
        // 과정 1의 조건문에 걸리지 않은 경우, 선택된 적이 없는 index이므로
        // 해당 수를 string에 push하고 (선택함),
        // check에 해당 index가 선택되었다는 것을 기록한다.
        string.push(arr[i]);
        check[i] = true;

        // 2-1, 2-2는 반목문에 의해 배열 arr의 처음부터 끝까지 모든 요소에 대해 진행된다.

        // 3. 재귀함수 호출 파트
        // 파트 2에서 위의 두 줄에서, 현재 단계에서 넣을 수 있는 문자를 찾았으므로,
        // 다음 단계로 진행하기 위해 step를 +1로 다음 단계를 호출한다.
        // 이때 현재까지 선택된 문자를 담은 string을 같이 넘겨준다.
        BT(step+1, string);

        // 4. 재귀함수 후처리 파트
        // 각 재귀함수가 종료된 후 처리해줘야 할 것을 적는 파트이다.
        // 이 문제에서 함수의 종료 조건은 step===M 의 조건에 걸렸을 때인데,
        // 해당 조건에 걸렸을 경우
        // 해당 시점까지 찾은 M개의 문자로 이루어진 string 문자열을 answer에 넣고 return 하였으므로

        // check[i]에 false를 넣고, string의 마지막 문자를 pop 한다.
        // string.pop()을 함수의 첫 부분에 if문에서 step===M 조건에 걸리고 나서가 아닌
        // 여기서 해주어야하는 이유는

        // 먼저, if문에서 string.pop()을 할 경우, 마지막 숫자만 pop이 된다.
        // 1 2 3(pop)
        // 1 2 4(pop)
        // 1 2 5(pop)

        // 따라서 step0에서 찾은 1, step1에서 찾은 2에 이어서
        // step 2에서 마지막 문자를 찾고 나서 answer에 넣은 뒤 pop한 결과는 다음과 같다.
        // 1 2
        // 위 상태에서 step 1의 for문이 한번 더 돌게 되므로
        // 1 2인 상태에서 for문의 i가 1에서 2로 증가하고
        // check[2] = false인 상태이므로
        // 1 2에 arr[2]인 3이 붙어 1, 2, 3 이 된다.
        // step = 1 인데 찾은 문자는 3개이므로 말이 안된다.

        // 즉 pop이 되어야하는 경우는 크게 두 가지 이다.
        // 경우 1) 종료 조건을 만족하여 마지막 수를 빼야하는 경우
        // 경우 2) N-1 미만의 단계(중간단계)에서 다음 수로 탐색을 넘어가기 위해 기존 수를 빼고 넣어야하는 경우

        // 즉, step이 내려올 때(재귀가 종료될 때)만 pop이 되는 것이 아니라,
        // 중간 단계의 for문의 숫자 i가 다음 수로 넘어갈 때도 pop이 필요하기 때문에 for문의 마지막에 적는다.

        // 따라서 if문에서 pop하지 않고, for문의 마지막에서 지워주게 되면
        // 함수 호출문이 끝나고, pop()을 실행하므로 경우 1을 충족하고,
        // 추가로 각 for문에서 i가 다음 값으로 넘어갈 때 pop() 을 실행하기 때문에
        // 경우 2도 충족하게 된다.
        // 따라서 위 예시에서 1, 2에서 for문이 다음으로 넘어가고 3이 붙어 1, 2, 3이 되는 것이 아닌,
        // 1, 2에서 2가 pop 되고, 다음으로 넘어가 3이 붙어 1, 3인 상태가 된 후에
        // 마지막 문자를 찾게 된다.

        // -> 함수 초반 if문에서 step===M 조건에 걸리고 재귀 함수 호출이 끝나게 되면
        check[i] = false;
        string.pop();
    }
}