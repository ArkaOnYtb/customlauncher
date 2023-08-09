const { Authenticator, Client } = require('minecraft-launcher-core')
const launcher = new Client()

// function that runs the game
// storage is a custom obj corresponding to the storage.json structure
function launchGame(storage) {

    let path = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share") + "/." + storage.title

    launcher.launch({
        clientPackage: null,
        authorization: storage.account,
        root: "C:\Users\kangp\AppData\Roaming",
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