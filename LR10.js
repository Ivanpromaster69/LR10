const fruits = ["cherries.png", "apple.png", "banana.png", "mango.png", "strawberry.png", "pomegranate.png"];
let playerName;
const startSlot = "banana.png";
let spinsCount = 0;
let slots = [[], [], []];

window.onload = function() {
    resetGame();
    playerName = prompt("Input your name:") || "NoName";
    document.getElementById("playerName").textContent = playerName;
};

function resetGame() {
    spinsCount = 0;
    slots = [[], [], []];
    const imageSlots = document.querySelectorAll(".imageSlot");
    document.getElementById("countSpins").textContent = "Let`s go gambling!";
    imageSlots.forEach((img, index) => {
        img.src = startSlot;
        img.classList.add("visible");
        slots[index].push(startSlot);
    });
    document.getElementById("result").textContent = "";
    document.getElementById("spinButton").disabled = false;
}

function getRandomFruit() {
    return fruits[Math.floor(Math.random() * fruits.length)];
}

function spin() {
    spinsCount++;
    document.getElementById("spinButton").disabled = true;
    document.getElementById("reset").disabled = true;
    document.getElementById("countSpins").textContent = `Round ${spinsCount}`;
    document.getElementById("result").textContent = "";
    const intervals = [];
    for (let i = 0; i < 3; i++) {
        const slot = document.getElementById(`slot${i + 1}`);
        const imageSlot = slot.querySelector(".imageSlot");
        const interval = setInterval(() => {
            const currentFruits = slots[i];
            const imgSrc = getRandomFruit(currentFruits);
            slots[i].push(imgSrc);

            imageSlot.src = imgSrc;
            imageSlot.classList.remove("visible");
            setTimeout(() => {
                imageSlot.classList.add("visible");
            }, 100);
        }, 100);

        intervals.push(interval);
    }
    setTimeout(() => {
        intervals.forEach(interval => clearInterval(interval));
        finalizeSpin();
    }, 3000);
}

function finalizeSpin(){
    document.getElementById("spinButton").disabled = false;
    document.getElementById("reset").disabled = false;
    if (checkWin()) {
        document.getElementById("result").textContent = `Congratulations, ${playerName}! Jackpot! You win 1 000 000$!`;
        document.getElementById("spinButton").disabled = true;
    } 
    else if (spinsCount >= 3) {
        document.getElementById("result").textContent = `Failure, ${playerName}. Take your jewellery to a pawnshop and try again!`;
        document.getElementById("spinButton").disabled = true;
    } 
    else if (slots[0][slots[0].length - 1] === slots[1][slots[1].length - 1] || 
             slots[1][slots[1].length - 1] === slots[2][slots[2].length - 1] ||
             slots[0][slots[1].length - 1] === slots[2][slots[2].length - 1]) {
        document.getElementById("result").textContent = `Uhh, ${playerName}, so close`;
    }
    else {
        document.getElementById("result").textContent = "";
    }
}

function checkWin() {
    if (slots[0][slots[0].length - 1] === slots[1][slots[1].length - 1] &&
        slots[1][slots[1].length - 1] === slots[2][slots[2].length - 1]) {
        return true;
    }
    return false;
}