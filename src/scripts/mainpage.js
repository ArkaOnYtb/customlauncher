let settings = require('../settings.json')

function load() {

    let playerHead = document.getElementById("playerInfo")
    playerHead.src = "https://crafatar.com/avatars/" + settings.account.uuid
    let playerName = document.getElementById("playerName").innerHTML = settings.account.name

}

module.exports = {
    load: load
}