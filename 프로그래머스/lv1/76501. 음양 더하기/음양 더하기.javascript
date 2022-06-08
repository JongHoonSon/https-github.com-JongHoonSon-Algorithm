function solution(absolutes, signs) {
    var answer = 123456789;
    
    let arr = new Array();
    
    let sum=0;
    
    for(let i=0; i<absolutes.length; i++) {
        if(signs[i] === false) {
            sum -= absolutes[i];
        } else {
            sum += absolutes[i];
        }
    }
    
    answer = sum;
    
    return answer;
}