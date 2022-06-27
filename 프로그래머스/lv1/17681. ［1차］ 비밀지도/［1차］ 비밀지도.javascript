function solution(n, arr1, arr2) {
    const answer = [];
    let binary1, binary2, secretMap = '';
    for(let i = 0; i < n; ++i){
        binary1 = getBinaryCodeString(n, arr1[i]);
        binary2 = getBinaryCodeString(n, arr2[i]);
        secretMap = '';
        // or 연산을 통해 비밀지도의 암호를 해독한다.
        for(let j = 0; j < n; ++j){
            secretMap += (binary1[j] | binary2[j]) === 1 ? '#' : ' ';
        }
        answer.push(secretMap);
    }
    return answer;
}

// count는 추출할 2진수 갯수, num은 변환할 10진수
function getBinaryCodeString(count, num){
    let divisor = Math.pow(2, count-1);
    let binaryCode = '';
    while(0 < divisor){
        if(divisor <= num){
            binaryCode += '1';
            num -= divisor;
        } else{
            binaryCode += '0';
        }
        divisor = parseInt(divisor / 2);
    }
    return binaryCode;
}