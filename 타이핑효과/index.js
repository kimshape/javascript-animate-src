let target = document.querySelector("#dynamic");
let i=0;

function randomString(){
let stringArr = ["당신이 찾던, 그 곳.", "당신이 찾던, 그 호텔.","당신이 찾던, 그 스파.", "당신이 찾던, 그 풀빌라.", "바로, 여기!","Drop The BIT!" ]
if(i<stringArr.length){
let selectString = stringArr[i++];
let selectStringArr = selectString.split("");
return selectStringArr; 
}else{
    return null;

}
}
//타이핑 리셋
function resetTyping(){
    target.textContent = "";
    dynamic(randomString());

}

//한글자씩 텍스트 출력 함수
function dynamic(randomArr){
if(randomArr.length>0){
    target.textContent += randomArr.shift();
    setTimeout(function(){
        dynamic(randomArr);
    },50);
}else{
    setTimeout(resetTyping,500);
}
}

dynamic(randomString())





//커서 깜빡임 효과
function blink(){
    target.classList.toggle("active");
}
setInterval(blink, 500);
