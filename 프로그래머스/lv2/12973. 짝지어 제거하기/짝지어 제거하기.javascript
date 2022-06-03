function solution(s)
{
    var answer = -1;

    let sArr = s.split("");
    
    let stack = [];
    
    for(let i=0; i<sArr.length; i++) {
        stack.push(sArr[i]);
        if(stack.length > 1) {
            if(stack[stack.length-2] === stack[stack.length-1]) {
                stack.pop();
                stack.pop();
            }
        }
    }
    
    if(stack.length === 0) {
        answer = 1;
    } else {
        answer = 0;
    }
    
    return answer;
}