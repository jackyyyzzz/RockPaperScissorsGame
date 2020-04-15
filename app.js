let userScore = 0;
let computerScore = 0;
let total_games = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById('r');
const paper_div = document.getElementById('p');
const scissors_div = document.getElementById('s');
const tracker_container = document.getElementById('tracker-container');

function getComputerChoice() {
    const choices = ['r', 'p', 's'];
    const randomNumber = Math.floor((Math.random() * 3));
    return choices[randomNumber];
}

function convertToWord(letter) {
    if (letter == "r") return "rock";
    if (letter == "p") return "paper";
    return "scissors";
}


function win(userChoice, computerChoice) {
    const userChoice_div = document.getElementById(userChoice);
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${convertToWord(userChoice)} beats ${convertToWord(computerChoice)}. You Win!`;
    userChoice_div.classList.add('green-glow');
    setTimeout(() => userChoice_div.classList.remove('green-glow'), 300);
}

function lose(userChoice, computerChoice) {
    const userChoice_div = document.getElementById(userChoice);
    computerScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${convertToWord(userChoice)} loses ${convertToWord(computerChoice)}. You Lost!`;
    userChoice_div.classList.add('red-glow');
    setTimeout(() => userChoice_div.classList.remove('red-glow'), 300);
}

function draw(userChoice, computerChoice) {
    const userChoice_div = document.getElementById(userChoice);
    result_p.innerHTML = `${convertToWord(userChoice)} equals ${convertToWord(computerChoice)}. It's a draw!`;
    userChoice_div.classList.add('gray-glow');
    setTimeout(() => userChoice_div.classList.remove('gray-glow'), 300);
}


function game(userChoice) {
    const computerChoice = getComputerChoice();
    total_games++
    switch (userChoice + computerChoice) {
        case "rs":
        case "pr":
        case "sp":
            win(userChoice, computerChoice);
            results(userChoice, computerChoice, total_games, 'win');
            break;
        case "rp":
        case "ps":
        case "sr":
            lose(userChoice, computerChoice);
            results(userChoice, computerChoice, total_games, 'lose');
            break;
        case "rr":
        case "pp":
        case "ss":
            draw(userChoice, computerChoice);
            results(userChoice, computerChoice, total_games, 'draw')
            break;
    }

}


function main() {
    rock_div.addEventListener('click', () => game("r"));
    paper_div.addEventListener('click', () => game("p"));
    scissors_div.addEventListener('click', () => game("s"));
}

main();

function restart() {
    userScore = 0;
    computerScore = 0;
    total_games = 0;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    tracker_container.innerHTML = ''
    result_p.innerHTML = "Game Restarted!";
}


function results(userChoice, computerChoice, total_games, outcome) {
    const result = document.createElement('div')
    const totalGames = document.createElement('span')
    const outcomeMsg = document.createElement('span')
    const userPick = document.createElement('img')
    const compPick = document.createElement('img')
    const divClass = document.createAttribute('class')
    const totalGamesClass = document.createAttribute('class')
    const outcomeMsgClass = document.createAttribute('class')
    const outcomeMsgStyle = document.createAttribute('style')
    const userImgSrc = document.createAttribute('src')
    const compImgSrc = document.createAttribute('src')

    // create result div
    divClass.value = 'result'
    result.setAttributeNode(divClass)

    // adding total game number
    totalGamesClass.value = 'action-message'
    totalGames.setAttributeNode(totalGamesClass)
    totalGames.innerHTML = total_games
    result.appendChild(totalGames)

    // adding user's choice picture
    userImgSrc.value = `images/${convertToWord(userChoice)}.png`
    userPick.setAttributeNode(userImgSrc)
    result.appendChild(userPick)

    // adding result msg
    outcomeMsgClass.value = 'action-message'
    switch (outcome) {
        case 'win':
            outcomeMsgStyle.value = 'color: green;';
            break;
        case 'lose':
            outcomeMsgStyle.value = 'color: red;';
            break;
        case 'draw':
            outcomeMsgStyle.value = 'color: white;';
            break;
    }
    outcomeMsg.setAttributeNode(outcomeMsgClass)
    outcomeMsg.setAttributeNode(outcomeMsgStyle)
    outcomeMsg.innerHTML = outcome
    result.appendChild(outcomeMsg)

    // adding comp's choice pic
    compImgSrc.value = `images/${convertToWord(computerChoice)}.png`
    compPick.setAttributeNode(compImgSrc)
    result.appendChild(compPick)

    tracker_container.prepend(result)
}