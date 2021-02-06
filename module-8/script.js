/* 
    TV Guide
    
    Write an async function called findShow(query)
        performs a fetch call to:
        https://api.tvmaze.com/singlesearch/shows?q=${query}&embed=seasons
        and returns the resulting show object
        
    Build a layout to display the show
        - Title
        - Summary
        - Seasons listed as individual divs
*/

async function findShow(query) {
    let response = await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${query}&embed=seasons`)
    let data = await response.json()
    return data
}

let query = 'himym'

findShow(query).then(show => {
    console.log(show)
    document.body.innerHTML = `<div class="my-show">
        <div class="my-show-title">
            ${show.name}
        </div>
        
        <div class="my-show-summary">
            ${show.summary}
        </div>
        
        ${show._embedded.seasons.map(season => {
            return `<div class="my-show-season" id="${season.number-1}">Season ${season.number}</div>`
        }).join('')}
    </div>`
    
    const seasons = document.querySelectorAll('.my-show-season')
    seasons.forEach(season => season.addEventListener('click', getSeasonInfo))
})

async function getSeasonInfo(e) {
    let response = await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${query}&embed=seasons`)
    let show = await response.json()
    // showSeason(show._embedded.seasons[e.target.id])
    // return data
    // console.log(e.target.id)
    let season = show._embedded.seasons[e.target.id]
    console.log(season)
    showSeason(season, show)
}

function showSeason(season, show) {

    document.body.innerHTML = `<div class="my-show">
    <div class="my-show-title">
        ${show.name}
    </div>
    
    <div class="my-show-summary">
        <div>Premiere Date: ${season.premiereDate}</div>
        <div>End Date: ${season.endDate}</div>
        <div>${season.episodeOrder}</div>
        <div>${season.url}</div>
    </div>
    
    ${show._embedded.seasons.map(season => {
        return `<div class="my-show-season">Season ${season.number}</div>`
    }).join('')}
    </div>`
}