
function addFavouriteHandler() {
    const txtUsername = document.getElementById('txtUsername')
    const txtPassword = document.getElementById('txtPassword')
    // const data = 'username=' + txtUsername.value + '&password=' + txtPassword.value
    const data = {
        'username': txtUsername.value,
        'password': txtPassword.value
    }
    ajaxRequest('POST', '/login', JSON.stringify(data))
        .then(data => {
            alert('User autenticado!!!')
            window.location.reload() // !!!!
        })
        .catch(err => {
            alert(err)
        })
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
    const promise = new Promise((resolve, reject) => {
        const xmlhttp = new XMLHttpRequest()
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
                if (xmlhttp.status == 200) {
                    resolve(xmlhttp.responseText)
                }
                else {
                    reject(new Error(xmlhttp.statusText))
                }
            }
        }    
        xmlhttp.open(meth, path,( true))
        xmlhttp.setRequestHeader('Content-Type', 'application/json')
        xmlhttp.send(data)
    })
    return promise
}