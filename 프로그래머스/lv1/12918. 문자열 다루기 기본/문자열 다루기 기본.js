function solution(s) {
    var answer = true;
    
    let numberFlag = true;
    let lengthFlag = false;
    
    if(s.length === 4 || s.length === 6) {
        lengthFlag = true
    }
    
    for(let i=0; i<s.length; i++) {
        if(isNaN(s[i])) {
            numberFlag = false;
        }
    }
    
    answer = numberFlag && lengthFlag;
    
    return answer;
}