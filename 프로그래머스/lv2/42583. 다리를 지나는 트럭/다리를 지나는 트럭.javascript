function solution(bridge_length, weight, truck_weights) {
    var answer = 0;
    
    let truckInfo = new Array(truck_weights.length);
    
    for(let i=0; i<truck_weights.length; i++) {
        truckInfo[i] = [truck_weights[i], 0];
    }
    
    for(let i=0; i<truck_weights.length; i++) {
        console.log("truckInfo[i][0]", truckInfo[i][0]);
    }
    
    let times = 0;
    
    let stack = [];
    
    while(truckInfo.length !== 0 || stack.length !== 0) {
        let pushFlag = false;
        if(stack.length === 0) {
            pushFlag = true;
        } else {
            for(let i=0; i<stack.length; i++) {
                stack[i][1] = stack[i][1] + 1;
            }
            
            if(stack[0][1] === bridge_length) {
                stack.shift()                    
            }
            
            let sumWeight = 0;
            
            if(stack.length > 0) {
                stack.forEach(el => {
                    sumWeight = sumWeight + el[0];
                })
            }
            
            if(truckInfo.length > 0) {
                if (weight >= sumWeight + truckInfo[0][0]) {
                    pushFlag = true;
                }
            }
        }
        
        if (pushFlag === true) {
            stack.push(truckInfo.shift());
        }
        
        times++;
    }
    
    answer = times;
    
    
    return answer;
}