function solution(s) {
    var answer = 0;
    
    let numberS;
    let minusFlag = false;
    
    s = s.split("");
    
    if(s[0] === "-") {
        s.splice(0, 1);
        minusFlag = true;
    }
    
    s = s.join("");
    
    numberS = Number(s);
    if(minusFlag) {
        numberS = -numberS;
    }
    
    answer = numberS
    
    return answer;
}