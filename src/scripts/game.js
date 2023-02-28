const { Authenticator, Client } = require('minecraft-launcher-core')
const launcher = new Client()

// function that runs the game
// storage is a custom obj corresponding to the storage.json structure
function launchGame(storage) {

    launcher.launch({
        clientPackage: null,
        authorization: storage.account,
        root: "./minecraft",
        version: {
            number: storage.game.version,
            type: storage.game.type
        },
        memory: storage.settings.ram
    })

}

launcher.on('debug', (e) => console.log(e));

launcher.on('data', (e) => {

});

launcher.on('close', (e) => {
    
})