function solution(enroll, referral, seller, amount) {
    var answer = [];
    
    let parentMap = new Map();
    
    for(let i=0; i<enroll.length; i++) {
        parentMap.set(enroll[i], referral[i]);
    }
    
    let moneyMap = new Map();
    
    for(let i=0; i<enroll.length; i++) {
        moneyMap.set(enroll[i], 0);
    }
    
    for(let i=0; i<seller.length; i++) {
        let sellerMan = seller[i];
        let value = amount[i] * 100;
        
        let forSeller;
        let forParent;
        let parent = parentMap.get(sellerMan);
        let goToParent;
        
        // 만약 판매자의 부모가 없다면
        // => 판매자가 모든 판매금을 가지게 됨
        if(parent === "-") {
            forSeller = value * 0.9;
            goToParent = false;
            
            // 판매자의 부모가 있다면
            // => 부모에게 0.1을 주고,
            // 부모의 부모.. 에게 줄 돈을 계산하기 위해 goToParent를 true로 변경함
        } else {
            forSeller = value * 0.9;        
            forParent = value * 0.1;
            goToParent = true;
        }
        
        // 판매자의 money 증가
        moneyMap.set(sellerMan, moneyMap.get(sellerMan) + forSeller);
        
        // 부모의 몫이 아직 존재할 경우 반복
        while(goToParent === true) {
            
            // 만약 부모가 더 이상 존재하지 않으면 goToParent를 false로 변경
            if(parentMap.get(parent) === "-") {
                goToParent = false;
            }
            
            // 현재 부모의 몫을 저장할 곳
            let forThisParent;

            // 위에 부모가 더 존재하면
            if(goToParent) {
                
                // 위의 부모에게 줄 수 있는 돈이 1원 미만이면, 지금 부모가 다 갖고,
                // 위의 부모의 몫이 없으므로 goToParent를 false로 변경함
                if(forParent * 0.1 < 1) {
                    forThisParent = forParent;
                    goToParent = false;
                    
                    // 위의 부모에게 줄 수 있는 돈이 1원 이상이면, 지금 부모의 몫에 0.9, 위의 부모의 몫에 0.1을 저장함
                } else {
                    let calcForParent = Math.floor(forParent * 0.1);
                    forThisParent = forParent - calcForParent;
                    forParent = calcForParent;
                }
                
                // 위에 부모가 더 없으면 (이번 부모가 마지막 부모이면),
                // Center에게 지급할 0.1을 제외한 0.9를 지금 부모가 가짐
            } else {
                let calcForCenter = Math.floor(forParent * 0.1);
                forThisParent = forParent - calcForCenter;
            }
            
            // 지금 부모의 money 증가
            moneyMap.set(parent, moneyMap.get(parent) + forThisParent);

            // 여기까지 왔는데 goToParent의 값이 true라면,
            // 현재 부모는 부모를 갖고 있고,
            // 해당 부모(위의 부모)의 몫이 존재한다는 것이므로
            // 해당 부모를 parent에 저장하고 반복문을 다시 수행함
            if(goToParent === true) {
                
                // 앞의 parent : 위의 부모
                // 뒤의 get.(parent) : 현재 부모
                // => 현재 부모의 위의 부모를 찾는 것                 
                parent = parentMap.get(parent)
            }
        }
    }
    
    for(let i=0; i<enroll.length; i++) {
        answer.push(moneyMap.get(enroll[i]));
    }
    
    return answer;
}