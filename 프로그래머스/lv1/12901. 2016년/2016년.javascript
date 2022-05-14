function solution(a, b) {
    var answer = '';
    
    let days = ["THU", "FRI", "SAT", "SUN", "MON", "TUE", "WED"]
    
    let daysPerMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    
    let totalDays = 0;
    
    for(let i =0 ; i<a-1; i++) {
        totalDays = totalDays + daysPerMonth[i];
    }
    
    totalDays = totalDays + b;
    
    console.log("totalDays", totalDays);
    
    let day = days[totalDays%7];
    
    answer = day;
    
    return answer;
}