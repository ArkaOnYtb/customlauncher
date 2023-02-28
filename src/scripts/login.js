const msmc = require('msmc')
const { Authenticator, Client } = require('minecraft-launcher-core')
const { ipcMain } = require('electron')


// the function opens a microsoft login window
// return 1 = error
async function loginMicrosoft() {

    return new Promise(resolve => {

        // open the window
        msmc.fastLaunch("electron", (update) => {
            console.log(update)
        }).then(result => {

            if(msmc.errorCheck(result)) {
                resolve(1)
            } else {
                // if the login is succesfull, we return the account profile object
                resolve(msmc.getMCLC().getAuth(result))
            }
        }).catch(reason => {
            resolve(1)
        })

    })

}

// the function try to auth with the parameters
// return 1 = error
async function loginMojang(pseudo, password) {

    return new Promise(resolve => {

        // try to auth
        let auth = Authenticator.getAuth(pseudo, password).catch(err => {
            resolve(1)
        }).then(res => {
            // if the response is undefined returns 1 else return the res
            resolve(res == undefined ? 1 : res)
        })

    })

}

// functions that runs the game
// launcher is a mclc class and settings a custom obj corresponding to the settings.json structure
function launchGame(launcher, settings) {

    if(launcher == undefined || storage == undefined) return

    launcher.launch({
        clientPackage: null,
        authorization: settings.account,
        root: "./minecraft",
        version: {
            number: settings.version,
            type: "release"
        },
        memory: settings.ram
    })

}

module.exports = {
    loginMicrosoft: loginMicrosoft,
    loginMojang: loginMojang,
    launchGame: launchGame
}