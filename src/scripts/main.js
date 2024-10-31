function levelDesign(lvl = level) {
    const end = 16 * lvl;
    let emojiSlice = emojis.slice(0, end);
    let shuffledCards = emojiSlice.sort(() => (Math.random() > 0.5 ? 2 : -1));
    console.log(shuffledCards);
    cardAllocation(emojiSlice, shuffledCards);
    return emojiSlice.length;
}
function elementCreate(
    element_type = "button",
    className = "",
    innerHTML = "",
    func = funcTest
) {
    const element = document.createElement(element_type);
    element.className = className;
    element.innerHTML = innerHTML;
    element.onclick = func;
    element.style += `background: #daa520; margin-left: 20px`;
    return element;
}

function cardAllocation(emojiSliceVector, shuffledVector) {
    for (let i = 0; i < emojiSliceVector.length; i++) {
        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = shuffledVector[i];
        card.onclick = cardHandleClick;
        if (level > 1) {
            card.style.width = `50px`;
        }
        document.querySelector("#tela").appendChild(card);
    }
    if (level == 1) {
        tela.style.gap = "10px";
    } else {
        tela.style.gap = "4px";
    }
}

function cardHandleClick() {
    if (
        openCards.length < 2 &&
        document.querySelectorAll(".cardOpen").length < 2
    ) {
        if (!this.classList.contains("cardOpen", "cardMatched")) {
            openCards.push(this);
            this.classList.add("cardOpen");
        }
    }
    if (openCards.length == 2) {
        setTimeout(() => {
            cardCheckMatch(openCards);
        }, 500);
    }
}

function cardCheckMatch(cards) {
    if (cards[0].innerHTML === cards[1].innerHTML) {
        console.log("Match: " + cards[0].innerHTML + "-" + cards[1].innerHTML);
        cards[0].classList.add("cardMatched");
        cards[1].classList.add("cardMatched");
    }
    cards[0].classList.remove("cardOpen");
    cards[1].classList.remove("cardOpen");

    openCards = [];
    conditionVictory();
}
function conditionVictory() {
    if (document.querySelectorAll(".cardMatched").length === matchsForVictory) {
        tela.innerHTML = "";
        const telaWin = tela.appendChild(youWin);
        if (level < 3) {
            youWin.appendChild(goToNextLevel);
            menu.appendChild(button_level);
        }
    }
}
function nextLevel() {
    youWin.removeChild(goToNextLevel);
    tela.removeChild(youWin);
    menu.removeChild(button_level);
    level++;
    matchsForVictory = levelDesign(level);
}
function funcTest() {}

const tela = document.querySelector("#tela");
const game = document.querySelector(".game");
const menu = document.querySelector(".menu");
const emojis = [
    "🙈",
    "🙈",
    "🐸",
    "🐸",
    "🐔",
    "🐔",
    "🐺",
    "🐺",
    "🐼",
    "🐼",
    "🐷",
    "🐷",
    "🐱",
    "🐱",
    "🐶",
    "🐶",
    "🙉",
    "🙉",
    "🙊",
    "🙊",
    "🐵",
    "🐵",
    "🐯",
    "🐯",
    "🐮",
    "🐮",
    "🐗",
    "🐗",
    "🐭",
    "🐭",
    "🐹",
    "🐹",
    "🐰",
    "🐰",
    "🐻",
    "🐻",
    "🐨",
    "🐨",
    "😻",
    "😻",
    "😼",
    "😼",
    "😽",
    "😽",
    "🙀",
    "🙀",
    "😿",
    "😿",
];
let openCards = [];
let level = 1;
let matchsForVictory = levelDesign(level);
let button_level = elementCreate(
    "button",
    "next_level",
    "Next Level",
    nextLevel
);

let youWin = elementCreate("h1", "vitoria", "You Win!");
let goToNextLevel = elementCreate(
    "h2",
    "goTo",
    "Go to next Level..",
    nextLevel
);
