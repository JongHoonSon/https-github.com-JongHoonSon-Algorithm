function solution(n, costs) {
    var answer = 0;
    
    costs.sort((a,b) => a[2] - b[2]);
    
    console.log(costs);
    
    let finished = new Array(n).fill(false);
    
    let usedBridge = new Array(costs).fill(false);
    
    let totalCost = 0;
    
    let [a, b, cost] = costs[0];
    finished[a] = true;
    finished[b] = true;
    totalCost = cost;
    usedBridge[0] = true;
    let bridgeCnt = 1;
    while(bridgeCnt<n-1) {
        for(let i=0; i<costs.length; i++) {
            if(usedBridge[i] === true) {
                continue;
            }
            let [a, b, cost] = costs[i];
            console.log("a, b, cost", a, b, cost);
            if((finished[a] === true && finished[b] === false) || (finished[a] === false && finished[b] === true)) {
                finished[a] = true;
                finished[b] = true;
                totalCost = totalCost + cost;
                usedBridge[i] = true;
                bridgeCnt++;
                break;
            }
        }
    }
    
    answer = totalCost;
    
    
    return answer;
}