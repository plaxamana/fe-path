const setupDiv = document.getElementById('setup')
const punchlineDiv = document.getElementById('punchline')
const punchlineBtn = document.getElementById('punchlineBtn')
const newJokeBtn = document.getElementById('newJokeBtn')
let punchline = ''

// Setup an async function called getJoke
// Create a variable called jokePromise that fetches a joke from https://official-joke-api.appspot.com/jokes/programming/random
// create a variable called joke that consumes the json data

const getJoke = async () => {
    const jokePromise = await fetch('https://official-joke-api.appspot.com/jokes/programming/random')
    const joke = await jokePromise.json()

    // get the joke and insert it into div
    setupDiv.textContent = joke[0].setup

    // punchline
    punchline = joke[0].punchline

    // clear the punchline
    punchlineDiv.classList.remove('bubble')
    punchlineDiv.textContent = ''

    // toggle the buttons on submit
    punchlineBtn.classList.toggle('hidden')
    newJokeBtn.classList.toggle('hidden')
}

const getPunchline = () => {
    punchlineDiv.textContent = punchline
    punchlineDiv.classList.add('bubble')
    punchlineBtn.classList.toggle('hidden')
    newJokeBtn.classList.toggle('hidden')   
}

const newJoke = async () => {
    getJoke()
}

getJoke()
punchlineBtn.addEventListener('click', getPunchline)
newJokeBtn.addEventListener('click', newJoke)