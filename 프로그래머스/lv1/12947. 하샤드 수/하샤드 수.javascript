function solution(x) {
    var answer = false;
    
    let strX = x.toString();
    
    let sum = 0;
    
    for(let i=0; i<strX.length; i++) {
        sum = sum + Number(strX[i]);
    }
    
    if(x % sum === 0) {
        answer = true;
    }
    
    return answer;
}