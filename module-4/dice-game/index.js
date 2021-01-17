// Create variables for the game state
let player1Score = 0
let player2Score = 0
let player1Turn = true

// Create variables to store references to the necessary DOM nodes
const player1Scoreboard = document.getElementById('player1Scoreboard')
const player2Scoreboard = document.getElementById('player2Scoreboard')
const player1Dice = document.getElementById('player1Dice')
const player2Dice = document.getElementById('player2Dice')
const rollBtn = document.getElementById('rollBtn')
const resetBtn = document.getElementById('resetBtn')
const doubleBtn = document.getElementById('doubleBtn')
const endBtn = document.getElementById('endBtn')
const message = document.getElementById('message')
const maxScore = 20
const doubleMsg = document.getElementById('doubleMsg')

const resetGame = () => {
    rollBtn.style.display = 'none'
    resetBtn.style.display = 'block'
    resetBtn.style.margin = '0 auto'
    resetBtn.style.marginTop = '50px'
}

const reset = () => {
    rollBtn.style.display = 'block'
    resetBtn.style.display = 'none'
    rollBtn.style.margin = '0 auto'
    rollBtn.style.marginTop = '50px'
    player1Score = 0
    player2Score = 0
    player1Scoreboard.textContent = 0
    player2Scoreboard.textContent = 0
    player1Dice.textContent = '-'
    player2Dice.textContent = '-'
}

/* Hook up a click event listener to the Roll Dice Button. */
rollBtn.addEventListener('click', () => {
    doubleMsg.style.display = 'block'
    doubleBtn.style.display = 'block'
    endBtn.style.display = 'block'
    // if player 1 turn
    if(player1Turn) {
        // roll a random number between 1 and 6
        const randomNumber = Math.floor(Math.random() * 6) + 1

        // assign the number to the die
        player1Dice.textContent = randomNumber

        // remove the active class on die 1 and add it on die 2
        player1Dice.classList.remove('active')
        player2Dice.classList.add('active')

        // increment player1score with the rolled die
        player1Score += randomNumber

        // assign current player1score to player1scoreboard
        player1Scoreboard.textContent = player1Score
        message.textContent = 'Player 2 Turn'
    } else {
        const randomNumber = Math.floor(Math.random() * 6) + 1
        player2Dice.textContent = randomNumber
        player2Dice.classList.remove('active')
        player1Dice.classList.add('active')
        player2Score += randomNumber
        player2Scoreboard.textContent = player2Score
        message.textContent = 'Player 1 Turn'
    }

    // Change message if player 1 wins
    if(player1Score >= maxScore) {
        message.textContent = 'Player 1 wins!'
        // hide the roll btn and display reset btn
        resetGame()
    } 
    
    // Change message if player 2 wins
    if(player2Score >= maxScore) {
        message.textContent = 'Player 2 wins'
        resetGame()
    }
    
    player1Turn = !player1Turn
 })

// if resetBtn was clicked, reset the whole game
resetBtn.addEventListener('click', () => {
    reset()
})