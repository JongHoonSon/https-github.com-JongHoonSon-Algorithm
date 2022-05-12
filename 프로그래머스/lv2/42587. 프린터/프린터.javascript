function solution(priorities, location) {
    var answer = 0;
    
    let newArray = new Array(priorities.length);
    
    for(let i=0; i<priorities.length; i++) {
        newArray[i] = {key:i, value:priorities[i]};
    }
    
    // console.log(newArray);
    
    let cnt = 1;
    
    while(newArray.length>0) {
        let item = newArray.shift();
        
        let flag = true;
        for(let i=0; i<newArray.length; i++) {
            if(newArray[i].value > item.value) {
                flag = false;
                break;
            }
        }
        
        if(flag === true) {
            if(item.key === location) {
                answer = cnt;
                break;
            }
            cnt++;
        } else {
            newArray.push(item);
        }
    }
    
    return answer;
}