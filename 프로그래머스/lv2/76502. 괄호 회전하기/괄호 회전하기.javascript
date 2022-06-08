function solution(s) {
    var answer = -1;
    
    let correctCnt = 0;
    
    if(s.length === 1) {
        return 0;
    }
    
    for(let i=0; i<s.length; i++) {
        let sArr = s.split("");
        
        for(let j=0; j<i; j++) {
            let a = sArr.shift();
            sArr.push(a);
        }
        
        let newS = sArr.join("");
        
        let result = checkRight(newS);
        
        if(result === true) {
            correctCnt++;
        }
    }
    
    function checkRight(s) {
        let stack = new Array();
        
        let arr = s.split("");
        
        let flag = true;
        
        let notFinish = 0;
        
        for(let i=0; i<arr.length; i++) {
            if(arr[i] === "[") {
                stack.push("[");
            } else if(arr[i] === "]") {
                if(stack.length===0) {
                    flag = false;
                    break;
                } else {
                     let a = stack.pop();
                    if(a!=="[") {
                        flag = false;
                        break;
                    }
                }
            } else if(arr[i] === "(") {
                stack.push("(");
            } else if(arr[i] === ")") {
                if(stack.length===0) {
                    flag = false;
                    break;
                } else {
                     let a = stack.pop();
                    if(a!=="(") {
                        flag = false;
                        break;
                    }
                }
            } else if(arr[i] === "{") {
                stack.push("{");
            } else if(arr[i] === "}") {
                if(stack.length===0) {
                    flag = false;
                    break;
                } else {
                    let a = stack.pop();
                    if(a!=="{") {
                        flag = false;
                        break;
                    }
                }
            }
        }
        
        if(stack.length !== 0) {
            flag = false;
        }
        
        return flag;
    }
    
    answer = correctCnt;
    
    return answer;
}