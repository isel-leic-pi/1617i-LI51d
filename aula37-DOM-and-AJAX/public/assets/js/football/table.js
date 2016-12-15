function checkFavouriteHandler(checkFavourite, teamId) {
    const listFavourites = document.getElementById('listFavourites')
    ajaxReq('PUT', "/football/favourites/" + teamId)
        .then(data => {
            alert(data)
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

function ajaxReq(meth, path) {
    const promise = new Promise((resolve, reject) => {
        const xmlhttp = new XMLHttpRequest()
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
                if (xmlhttp.status == 200) {
                    resolve(xmlhttp.responseText)
                }
                else {
                    reject(new Error('User not authenticated!'))
                }
            }
        }    
        xmlhttp.open(meth, path, true)
        xmlhttp.send()
    })
    return promise
}