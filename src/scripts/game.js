const { Authenticator, Client } = require('minecraft-launcher-core')
const { launch } = require('msmc')
const launcher = new Client()
const { emit } = require('../index')

// function that runs the game
// storage is a custom obj corresponding to the storage.json structure
function launchGame(storage) {

    let path = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share") + "/."
    path += "/." + (storage.title).toLowerCase().replace(" ", "_")
    launcher.launch({
        clientPackage: null,
        authorization: storage.account,
        root: path,
        version: {
            number: storage.game.version,
            type: storage.game.type
        },
        memory: storage.ram
    })
    console.log(path)

}

launcher.on('debug', (e) =>{
    
});

launcher.on('data', (data) => {
    //console.log(data)
    if(data.includes("Setting user:")) {
        console.log("LANCEMENT DU JEU")
    }
    
});

launcher.on('close', (e) => {
    
})

launcher.on('progress', event => {
    let coef = 100 / event.total
    //console.log(Math.round(event.task * coef))
    //console.log(event)

    let args = {task: event.type, percentage: Math.round(event.task * coef)}

    emit("loadPercentage", args)

})
launcher.on('download-status', event => {
    //console.log(event)
})


module.exports = {
    launchGame: launchGame
}