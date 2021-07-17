document.querySelector('.btn-1').addEventListener('click',function(){
    document.querySelector('#slider').style.transform = 'translate(0vw)';
});
document.querySelector('.btn-2').addEventListener('click',function(){
    document.querySelector('#slider').style.transform = 'translate(-100vw)';
});

document.querySelector('.btn-3').addEventListener('click',function(){
    document.querySelector('#slider').style.transform = 'translate(-200vw)';
});