const grid = document.querySelector('.grid')
const startBtn = document.getElementById('start')
const score = document.getElementById('score')
let squares = []
let currentSnake = [2,1,0]
let direction = 1

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
    // remove last element from our currentSnake array
    const tail = currentSnake.pop()

    // remove the styling from the last element
    squares[tail].classList.remove('snake')

    // add a square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction)
    // const head = currentSnake.unshift(currentSnake[0] + direction)

    // add styling to see it
    squares[currentSnake[0]].classList.add('snake')
}

move();

// let timerId = setInterval(move, 1000)

// 39 is right arrow
// 38 is for up arrow
// 37 is for left arrow
// 40 is for the down arrow

const control = (e) => {
    // if right arrow is pressed
    if (e.keyCode === 39) {
        console.log('right pressed')
    } else if (e.keyCode === 38) {
        console.log('up pressed')
    } else if (e.keyCode === 37) {
        console.log('left pressed')
    } else if (e.keyCode === 40){
        console.log('down pressed')
    }
}
