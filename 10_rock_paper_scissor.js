let score = JSON.parse(localStorage.getItem('score'));

if (!score) {
    score = {
        wins: 0,
        loses: 0,
        tie: 0
    };
}

updateScoreELement();

function playGame(playerMove) {
    const computermove = pickComputerMove();
    let result = '';

    if (playerMove === computermove) {
        result = 'tie';
    } else if (
        (playerMove === 'rock' && computermove === 'scissors') ||
        (playerMove === 'paper' && computermove === 'rock') ||
        (playerMove === 'scissors' && computermove === 'paper')
    ) {
        result = 'you win';
    } else {
        result = 'you lose';
    }

    if (result === 'you win') {
        score.wins++;
    } else if (result === 'you lose') {
        score.loses++;
    } else if (result === 'tie') {
        score.tie++;
    }

    localStorage.setItem('score', JSON.stringify(score));
    updateScoreELement();
    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You 
        <img src="${playerMove}-emoji.png" class="move-icon">
        <img src="${computermove}-emoji.png" class="move-icon">
        Computer
    `;

    playSound(result); // Play sound based on the game outcome
}

function updateScoreELement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.loses}, Ties: ${score.tie}`;
}

function pickComputerMove() {
    const randomnumbr = Math.random();
    if (randomnumbr < 1 / 3) {
        return 'rock';
    } else if (randomnumbr < 2 / 3) {
        return 'paper';
    } else {
        return 'scissors';
    }
}

function playSound(result) {
    const winSound = new Audio('win-sound.mp3');
    const loseSound = new Audio('lose-sound.mp3');
    const tieSound = new Audio('tie-sound.mp3');

    if (result === 'you win') {
        winSound.play();
    } else if (result === 'you lose') {
        loseSound.play();
    } else if (result === 'tie') {
        tieSound.play();
    }

}
