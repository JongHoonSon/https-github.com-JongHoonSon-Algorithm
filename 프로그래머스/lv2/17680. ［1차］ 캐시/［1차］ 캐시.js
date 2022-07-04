function solution(cacheSize, cities) {
    let cacheArr = [];
    let time = 0;
    for (let i=0; i<cities.length; i++){
        // 모두 소문자 처리
        cities[i] = cities[i].toLowerCase();
        // 현재 도시 이름과 같은 데이터가 있으면 idx 업데이트
        // 현재 도시 이름과 같은 데이터가 없으면 새로 추가
        // 꽉 차있으면 젤 앞에 데이터 삭제 (idx가 클수록 최근이도록 정렬함)
        let findObj = cacheArr.find(ele=>ele.name===cities[i]);
        if (findObj === undefined){
            let obj = {name:cities[i], idx:i};
            cacheArr.push(obj);
            time += 5;
            if (cacheArr.length >cacheSize){
                cacheArr.shift();
            }
        }else{
            let findIdx = cacheArr.indexOf(findObj);
            cacheArr[findIdx].idx = i;
            time += 1;
        }
        // cacheArr를 idx에 따라 정렬 (idx가 클수록 최근이므로 이렇게 정렬)
        cacheArr.sort((a,b)=>{
            if (a.idx>b.idx){
                return 1;
            }else if (a.idx<b.idx){
                return -1;
            }
        })
        //console.log(cacheArr);
    }
    return time;
}