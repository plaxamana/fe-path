// variables
const urlBase = "https://api.punkapi.com/v2/beers";
const beersDiv = document.querySelector('.beers')

const getBeers = async () => {
    const res = await fetch(urlBase)
    let beerHtml = ''
    try {
        const beers = await res.json()
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
            </div>
            `
        }
        
        beersDiv.innerHTML = beerHtml
    } catch (e) {
        console.log(e)
    }
}

getBeers()