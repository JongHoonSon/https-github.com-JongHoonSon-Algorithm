function solution(k, tangerine) {
    let map = new Map();
    let count = 0;
    const number = tangerine.length - k;
    
    tangerine.forEach((item)=>{
        if(!map.has(item)){
            map.set(item,1);
        }
        else{
            map.set(item,map.get(item)+1);
        }
    })
    const array = Array.from(map);
    array.sort((a,b)=>a[1]-b[1]);
    
    let newArr = array.filter((item)=>{
        while(item[1] && count!==number){
            item[1]-=1;
            count+=1;
        }
        if(item[1]!==0)return item;
    })
    
    return newArr.length;
    
}