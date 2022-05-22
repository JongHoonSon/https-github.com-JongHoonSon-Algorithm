function solution(phone_number) {
    var answer = '';
    
    let newPhoneNumber = '';
    
    for(let i=0; i<phone_number.length; i++) {
        if(i<phone_number.length-4) {
            newPhoneNumber = newPhoneNumber + '*';
        } else {
            newPhoneNumber = newPhoneNumber + phone_number[i];
        }
    }
    
    answer = newPhoneNumber;
    
    return answer;
}