const symbols = ['α','β','γ','δ','ε','ζ','η','θ'];
let cards = [...symbols, ...symbols]; // duplicate for pairs

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 100;
let matchedPairs = 0;

const gameBoard = document.getElementById('gameBoard');
const scoreDisplay = document.getElementById('score');
const message = document.getElementById('message');

// Shuffle cards
cards.sort(() => 0.5 - Math.random());

// Create cards
cards.forEach(symbol => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.innerText = '';
    card.addEventListener('click', () => flipCard(card));
    gameBoard.appendChild(card);
});

function flipCard(card) {
    if (lockBoard || card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    card.innerText = card.dataset.symbol;

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    checkMatch();
}

function checkMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs++;
        resetTurn();

        if (matchedPairs === symbols.length) {
            message.innerText = "🎉 You won the game!";
        }
    } else {
        score -= 4;
        scoreDisplay.innerText = score;

        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.innerText = '';
            secondCard.innerText = '';
            resetTurn();

            if (score <= 0) {
                message.innerText = "Game Over! Score reached 0.";
                lockBoard = true;
            }
        }, 800);
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}
