function solution(numbers) {
    var answer = -1;
    
    let isIn = new Array(10).fill(false);
    
    for(let i=0; i<numbers.length; i++) {
        isIn[numbers[i]] = true;
    }
    
    let notIn = new Array();
    
    for(let i=0; i<isIn.length; i++) {
        if(isIn[i] === false) {
            notIn.push(i);
        }
    }
    
    let sum = 0;
    
    for(let i=0; i<notIn.length; i++) {
        sum += notIn[i];
    }
    
    answer = sum;
    
    return answer;
}