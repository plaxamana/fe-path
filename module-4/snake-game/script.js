const grid = document.querySelector('.grid')
const startBtn = document.getElementById('start')
const score = document.getElementById('score')
let squares = []

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
    console.log(squares)
}

createGrid();