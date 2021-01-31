// variables
const urlBase = "https://api.punkapi.com/v2/beers?page="
const filterABV = document.getElementById('filterABV')
const filterIBU = document.getElementById('filterIBU')
const pageText = document.getElementById('pageNumber')
const prevPage = document.getElementById('prevPage')
const nextPage = document.getElementById('nextPage')
const beersDiv = document.querySelector('.beers')

let optionsABV = '', optionsIBU = '', page = 1

filterABV.addEventListener('change', (e) => {
    const value = e.target.value

    switch(value) {
        case 'all':
            optionsABV = '';
            break
        case 'weak':
            optionsABV = '&abv_lt=4.6'
            break
        case 'medium':
            optionsABV = '&abv_gt=4.5&abv_lt=7.6'
            break
        case 'strong':
            optionsABV = '&abv_gt=7.5'
            break
    }
    page = 1
    getBeers()
})

filterIBU.addEventListener('change', (e) => {
    const value = e.target.value 

    switch(value) {
        case 'all':
            optionsIBU = '';
            break
        case 'weak':
            optionsIBU = '&ibu_lt=35'
            break
        case 'medium':
            optionsIBU = '&ibu_gt=34&ibu_lt=75'
            break
        case 'strong':
            optionsIBU = '&ibu_gt=74'
            break 
    }
    page = 1
    getBeers()
})


const getBeers = async () => {
    const url = urlBase + page + optionsABV + optionsIBU
    const res = await fetch(url)
    console.log(url)
    let beerHtml = ''
    
    try {
        const beers = await res.json()
        pageText.innerText = page;
        if(page === 1) {
            prevPage.disabled = true
        } else {
            prevPage.disabled = false
        }

        if (beers.length < 25) {
            nextPage.disabled = true
        } else {
            nextPage.disabled = false
        }

        for(let beer of beers) {
            beerHtml += `
            <div class="beer-wrapper card">
                <div class="beer">
                    <img class='beer__img' src='${beer.image_url}' />
                    <h3>${beer.name}</h3>
                    <span class='beer__info'>
                        <span>ABV: ${beer.abv}%</span>
                        <span>IBU: ${beer.ibu}</span>
                    </span>
                </div>
                <div class='beer__content'>
                    <div class='beer__name'>${beer.name}</div>
                    <div class='beer__tagline'>${beer.tagline}</div>
                    <div class='beer__description'>${beer.description}</div>
                    <div class='beer__food-pairing'>
                        Pair with: ${beer.food_pairing.join(', ')}
                    </div>
                </div>
            </div>
            `
        }
        
        beersDiv.innerHTML = beerHtml
    } catch (e) {
        console.log(e)
    }
}

// pagination
prevPage.addEventListener('click', () => {
    page--
    getBeers()
})

nextPage.addEventListener('click', () => {
    page++
    getBeers()
})

getBeers()