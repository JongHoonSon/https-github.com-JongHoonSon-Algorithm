function solution(progresses, speeds) {
    var answer = [];
    
    let stack;
    let toDeploy;
    let deployed = new Array(progresses.length).fill(false);
    let endFlag = false;
    
    while(endFlag === false) {
        for(let i=0; i<progresses.length; i++) {
            progresses[i] = progresses[i] + speeds[i];
        }
        
        stack = [];
        toDeploy = [];
        
        for(let i=0; i<deployed.length; i++) {
            if(deployed[i] === false) {
                if(progresses[i] >= 100) {
                    if(stack.length===0) {
                        toDeploy.push(i);
                        deployed[i] = true;
                    }
                } else {
                    stack.push(i);
                }
            }
        }
        
        if(toDeploy.length > 0) {
            answer.push(toDeploy.length);
        }
        
        endFlag = true;
        
        for(let i=0; i<deployed.length; i++) {
            if(deployed[i] === false) {
                endFlag = false;
            }
        }
    }
    
    return answer;
}