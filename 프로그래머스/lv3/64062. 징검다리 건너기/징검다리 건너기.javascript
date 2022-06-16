function checkStone(stones, mid, k) {
    let consec = 0;
    for(let i = 0; i < stones.length; i++) {
        if(stones[i] < mid) { 
            consec += 1;
        } else { 
            consec = 0;
        }
        
        if(consec >= k) { 
            return false;
        } 
    } 
    
    return true;
}
function solution(stones, k) {
    let left = 1;
    let right = 200000000;

    while(left < right-1) {
        let mid = Math.floor((left + right) / 2);
        
        if (checkStone(stones, mid, k)) {
            left = mid;
        } else {
            right = mid;
        }
    }

    return left;
}