function solution(n, cores) {
    let left = 0
    let right = Math.ceil(1 / cores.reduce((avg, c) => avg + 1/c,0)) * n
    
    if(n < cores.length) return n
    
    let works
    
    while(left <= right){
        const mid = Math.floor((left + right) / 2)
        
        works = cores.reduce((works, c) => works + 1 + Math.floor(mid / c), 0)

        if(works < n){
            left = mid + 1
        }else{
            right = mid - 1
        }
    }
    
    let runTime = left-1
    works = cores.reduce((works, c) => works + 1 + Math.floor(runTime / c), 0)

    for(let i=0; i<cores.length; i++){
        const core = cores[i]

        if((runTime+1) % core === 0){
            works++
            if(works === n) return i+1
        }   
    }
}