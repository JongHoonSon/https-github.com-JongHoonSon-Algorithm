function solution(n, build_frame) {
    const answer = [];
    const gi=Array.from(Array(n+2),()=> Array(n+2).fill(0));
    const bo=Array.from(Array(n+2),()=> Array(n+2).fill(0));
    
    function check(y,x,type){
        if(type===0){
            if(y===n) return true;   
            if(gi[y+1][x]) return true;
            if(bo[y][x] || (x>0 && bo[y][x-1])) return true;
        }else{
            if(gi[y+1][x] || (x<n && gi[y+1][x+1])) return true;
            if(x>0 && bo[y][x-1] && bo[y][x+1]) return true;
        }
        return false;
    }
    
    function enableDelete(){
        for(let i=1;i<=n;i++){
            for(let j=0;j<=n;j++){
                if(!gi[i][j]) continue;
                if(!check(i,j,0)) return false;
            }
        }
        for(let i=0;i<n;i++){
            for(let j=0;j<n;j++){
                if(!bo[i][j]) continue;
                if(!check(i,j,1)) return false;
            }
        }
        return true;
    }
    
    for(let i=0;i<build_frame.length;i++){
        const y=n-build_frame[i][1];
        const x=build_frame[i][0];
        const type=build_frame[i][2];
        const behave=build_frame[i][3];
        
        if(behave===1){
            if(type===0 && check(y,x,0)) gi[y][x]=1;
            else if(type===1 && check(y,x,1)) bo[y][x]=1;
        }
        else{
            if(type===0){
                gi[y][x]=0;
                if(!enableDelete()) gi[y][x]=1;
            }            
            else{
                bo[y][x]=0;
                if(!enableDelete()) bo[y][x]=1;
            }
        }
    }
    
    function makeAnswer(){
        for(let j=0;j<=n;j++){
             for(let i=n;i>=0;i--){
                if(gi[i][j]) answer.push([j,n-i,0]);
                if(bo[i][j]) answer.push([j,n-i,1]);
            }
        }
        
    }
    makeAnswer();
    return answer;
}