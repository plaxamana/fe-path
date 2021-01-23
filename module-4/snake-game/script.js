const grid = document.querySelector('.grid')
const startBtn = document.getElementById('start')
const scoreDisplay = document.getElementById('score')
let squares = []
let currentSnake = [2,1,0]
let direction = 1
let width = 10
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0
let appleIndex = 0

const startGame = () => {
    // remove the snake
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    // remove the apple
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId)
    currentSnake = [2,1,0]
    score = 0
    // re add new score to browser
    scoreDisplay.textContent = score
    direction = 1
    intervalTime = 1000
    speed = 0.9
    generateApple()
    // re-add the class of snake to our new currentSnake
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    timerId = setInterval(move, intervalTime)
}

const createGrid = () => {
    // create 100 of these elements
    for (let i=0; i<100; i++) {
        // create element
        const square = document.createElement('div')
        // add styling to the element
        square.classList.add('square')
        // put the element into our grid
        grid.appendChild(square)
        // push it into a new quares array
        squares.push(square)
    }
    // console.log(squares)
}


createGrid();

currentSnake.forEach(index => squares[index].classList.add('snake'))

const move = () => {
    // check if the snake has collided with the wall
    if (
        (currentSnake[0] + width >= width*width && direction === width) || // if snake has hit bottom
        (currentSnake[0] % 10 === width-1 && direction === 1) || // if snake has hit right wall
        (currentSnake[0] % 10 === 0 && direction === -1) || // if snake has hit left wall
        (currentSnake[0] - width < 0 && direction === -width) || // if snake has hit top 
        squares[currentSnake[0] + direction].classList.contains('snake') // if the snake collides with itself
    )
    return clearInterval(timerId)


    // remove last element from our currentSnake array
    const tail = currentSnake.pop()

    // remove the styling from the last element
    squares[tail].classList.remove('snake')

    // add a square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction)
    // const head = currentSnake.unshift(currentSnake[0] + direction)

    // add styling to see it

    // deal with snake head eating apple
    if(squares[currentSnake[0]].classList.contains('apple')) {
        // remove the class of apple
        squares[currentSnake[0]].classList.remove('apple')
        // grow snake tail +1 by adding snake class
        squares[tail].classList.add('snake')
        // grow snake array
        currentSnake.push(tail)
        // generate a new apple
        generateApple()
        // add one to the score
        score++
        // display score
        scoreDisplay.textContent = score
        // speed up our snake
        clearInterval(timerId)
        intervalTime = intervalTime * speed
        timerId = setInterval(move, intervalTime)
    }




    squares[currentSnake[0]].classList.add('snake')
}





const generateApple = () => {

    do {
        // generate a random number
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}
generateApple();

// 38 is for up arrow
// 37 is for left arrow
// 40 is for the down arrow

const control = (e) => {
    // if right arrow is pressed
    if (e.keyCode === 39) {
        direction = 1

    // if up arrow is pressed
    } else if (e.keyCode === 38) {
        direction = -width

    // if the left arrow is pressed
    } else if (e.keyCode === 37) {
        direction = -1

    // if the down arrow is pressed
    } else if (e.keyCode === 40){
        direction = +width
    }
}

document.addEventListener('keydown', control)

startBtn.addEventListener('click', startGame)