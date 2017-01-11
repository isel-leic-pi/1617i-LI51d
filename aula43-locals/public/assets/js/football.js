
function loginHandler() {
    const txtUsername = document.getElementById('txtUsername')
    const txtPassword = document.getElementById('txtPassword')
    // const data = 'username=' + txtUsername.value + '&password=' + txtPassword.value
    const data = {
        'username': txtUsername.value,
        'password': txtPassword.value
    }
    ajaxRequest('POST', '/login', JSON.stringify(data))
        .then(data => ajaxRequest('GET', '/partials/favouritesList'))
        .then(favsList => document
            .getElementById('panelFavourites')
            .innerHTML = favsList
        )
        .catch(alert)
}

function favouritesHandler(id, checkFavourite){
    const listFavourites = document.getElementById('listFavourites')
    const path = "/football/favourites/" + id
    ajaxRequest('PUT', path)
        .then(data => {
            // listFavourites.innerHTML += data
            listFavourites.appendChild(stringToHtml(data))
        })
        .catch(err => {
            alert(err)
            checkFavourite.checked = false
        })
}

function stringToHtml(str) {
    const div = document.createElement('div')
    div.innerHTML = str
    return div.firstChild
}

function ajaxRequest(meth, path, data) {
    return fetch(path, {
        method: meth,
        headers: {'Content-Type': 'application/json'},
        body: data,
        credentials: 'same-origin'
    })
    .then(resp => {
        if(resp.status != 200) throw new Error(resp.statusText)
        return resp.text()
    })
}