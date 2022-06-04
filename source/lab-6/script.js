let character = document.getElementById("character");
let block = document.getElementById("block");
let startBtn = document.getElementById("startBtn");
let plus1 = document.getElementById("plus1");
let scoreSpan = document.getElementById("score");
let counter = 0;
let speed = 1.3;

function jump() {
    if (character.classList=="animate")
        return;
    
    character.classList.add("animate");
    setTimeout(function() {
        character.classList.remove("animate");
    }, 500);
}

function setCounter(score) {
    document.getElementById("score").innerHTML = score;
    plus1.style.animation = "disappear 1s linear";
    animationInterval = setTimeout(function() {
        plus1.style.animation = "none";
    }, 1000)
}

startBtn.onclick = function() {
    counter = 0;
    setCounter(counter);
    startBtn.classList.toggle("d-none");
    document.getElementById("gameOver").classList.add('d-none');
    block.style.animation = "block " + speed + "s infinite linear";
    scoreSpan.style.animation = "bounce-top 1.3s infinite both";

    document.onkeydown = function isSpaceBar(e) {
        if (e.keyCode == '32')
            jump()
    }
    document.onclick = function() {
        jump();
    }

    let isAlive = setInterval(function() {
        let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'));
        let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
    
        if (blockLeft < 40 && blockLeft > -40 && characterTop >= 130) {
            block.style.animation = "none";
            scoreSpan.style.animation = "none";
            document.getElementById("gameOver").classList.remove('d-none');
            // alert("Игра окончена. Счет: " + Math.floor(counter / 100));
            startBtn.classList.toggle("d-none");
            clearInterval(isAlive);
            clearInterval(counterInterval)
        } 
    }, speed*10);

    let counterInterval = setInterval(function() {
        counter++;
        setCounter(counter);
    }, 1300);
}

