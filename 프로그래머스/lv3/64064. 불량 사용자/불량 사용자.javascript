function solution(user_id, banned_id) {
    var answer = [];
    
    let check = new Array(user_id.length).fill(false);
    
    let arr = [];
    
    let results = [];
    
    BT(0);
    
    // console.log(results);
    
    for(let i=0; i<results.length; i++) {
        results[i] = results[i].split(",");
    }
    
    console.log(results);
    console.log("------------");
    
    // BT 결과 (길이가 같은 조합)
    // 약 100개
    first: for(let i=0; i<results.length; i++) {
        let allFound = true;
        let used_banned_id_arr = new Array(results[i].length).fill(false);
        
        // 각 결과의 단어들
        // 최대 8
        second: for(let j=0; j<results[i].length; j++) {
            let result_id_arr = results[i][j].split("");
            
            let found = false;
            
            let used_banned_id_index;
                
            // 각 제제 아이디
            // 최대 8
            for(let k=0; k<banned_id.length; k++) {
                if(used_banned_id_arr[k] === true) {
                    continue;
                }
                
                let banned_id_arr = banned_id[k].split("");
                
                if(result_id_arr.length !== banned_id_arr.length) {
                   continue;
                }
                
                used_banned_id_index = k;
                let allLettersSame = true;
                
                // 각 단어들의 문자
                // 최대 8
                for(let m=0; m<result_id_arr.length; m++) {
                    if(banned_id_arr[m] === "*") {
                        continue;
                    } else {
                        if(banned_id_arr[m] !== result_id_arr[m]) {
                            allLettersSame = false;
                            break;
                        }
                    }
                }
                
                if(allLettersSame === true) {
                    found = true;
                    used_banned_id_arr[used_banned_id_index] = true;
                    break;
                }
            }
            
            if(found === false) {
                allFound = false;
                break second;
            }
        }
        
        if(allFound === true) {
            answer.push(results[i]);
        }
    }
    
    
    function BT(step) {
        if(step === banned_id.length) {
            results.push(arr.join(","));
            return false;
        }
        
        for(let i=0; i<user_id.length; i++) {
            if(check[i] === true) {
                continue;
            }
            
            check[i] = true;
            arr.push(user_id[i]);
            BT(step+1);
            check[i] = false;
            arr.pop();
        }
    }
    
    // for(let i=0; i<answer.length; i++) {
    //     answer[i].sort((a,b) => a-b)
    // }
    
    // answer.sort((a,b) => a-b)
    
    answer.sort();
    
    for(let i=0; i<answer.length; i++) {
        answer[i].sort()
    }
    
    console.log(answer);
    
    console.log("------------");
    
    let answerSet = new Set();
    
    for(let i=0; i<answer.length; i++) {
        answerSet.add(JSON.stringify(answer[i]));
    }
    
    answer = Array.from(answerSet);
    
    for(let i=0; i<answer.length; i++) {
        answer[i] = JSON.parse(answer[i]);
    }
    
    console.log(answer);
    
    return answer.length;
}

