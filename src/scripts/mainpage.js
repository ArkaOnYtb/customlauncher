let settings = require('../settings.json')
const {Client, Authenticator} = require("minecraft-launcher-core")

function load() {

    let playerHead = document.getElementById("playerInfo")
    playerHead.src = "https://crafatar.com/avatars/" + settings.account.uuid
    let playerName = document.getElementById("playerName").innerHTML = settings.account.name

}

function play(){
    Authenticator.getAuth()
}


module.exports = {
    load: load
}