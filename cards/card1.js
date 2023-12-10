let table1 = document.querySelector("table");
let numbers = [1,2,4,5,7];
let number1;
function RandomNum(a){
    a = Math.floor(Math.random() * 4);
    return a;
}
function RndCarsTable(){

for(let i = 0; i < 1; i++){  
table1.innerHTML += `
<img src="/images/car${numbers[RandomNum(number1)]}.jpg" style="width: 250px; height: 150px;" alt="">`
}
}