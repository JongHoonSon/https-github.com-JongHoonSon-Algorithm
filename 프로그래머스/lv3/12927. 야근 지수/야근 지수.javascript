function solution(n, works) {
    var answer = 0;
    
    works.sort((a,b) => b-a);
    
    let worksGap = new Array(works.length);
    
    for(let i=0; i<works.length-1; i++) {
        worksGap[i] = works[i] - works[i+1];
    }
    
    worksGap[worksGap.length-1] = 0;
    
    console.log("works");
    console.log(works);
    console.log("worksGap");
    console.log(worksGap);
    
    out:
    while(n!==0) {
        for(let i=0; i<worksGap.length; i++) {
            if(worksGap[i] !== 0) {
                while(worksGap[i] !== 0) {
                    for(let j=0; j<=i; j++) {
                        works[j] = works[j] - 1;
                        n = n-1;
                        if(n===0) {
                            break out;
                        }
                    }
                    worksGap[i] = worksGap[i] - 1;
                }
            }
        }
        
        while(true) {
            let allIsZero = true;
            for(let i=0; i<works.length; i++) {
                if(works[i]!==0) {
                    allIsZero = false;
                    works[i] = works[i] - 1;
                    n = n-1;
                    if(n===0) {
                        break out;
                    }
                }
            }
            if(allIsZero) {
                break out;
            }
        }
    }
    
    let result = 0;
    
    for(let i=0; i<works.length; i++) {
        result = result + works[i] ** 2;
    }
    
    answer = result;

    return answer;
}