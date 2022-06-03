function solution(nums) {
    var answer = -1;
    
    let newNums = new Array();
    
    for(let i=0; i<nums.length-2; i++) {
        for(let j=i+1; j<nums.length-1; j++) {
            for(let k=j+1; k<nums.length; k++) {
                newNums.push(nums[i]+nums[j]+nums[k]);
            }
        }
    }
    
    console.log(newNums);
    
    let primes = [];
    
    for(let i=0; i<newNums.length; i++) {
        let isPrime = true;
        for(let j=2; j<newNums[i]; j++) {
            if(newNums[i]%j === 0) {
                isPrime = false;
                break;
            }
        }
        if(isPrime === true) {
            primes.push(newNums[i]);
        }
    }
    
    console.log(primes);
    
    answer = primes.length;
    
    return answer;
}