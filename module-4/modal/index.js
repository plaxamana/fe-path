const open = document.getElementById('open-modal')
const overlay = document.getElementById('overlay')

open.addEventListener('click', () => {
    overlay.style.display = 'block'
})

const close = document.getElementById('close-modal')

close.addEventListener('click', () => {
    overlay.style.display = 'none'
})

// overlay.addEventListener('click', () => {
//     overlay.style.display = 'none'
// })