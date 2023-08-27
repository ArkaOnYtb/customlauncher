//const msmc = require('msmc')
const { Auth } = require('msmc')
const { Authenticator, Client } = require('minecraft-launcher-core')
const { ipcMain } = require('electron')


// the function opens a microsoft login window
// return 1 = error
async function loginMicrosoft() {

    return new Promise(resolve => {

        /*// open the window
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
        })*/


        const authManager = new Auth("select_account");

        //Launch using the 'raw' gui framework (can be 'electron' or 'nwjs')
        const xboxManager = authManager.launch("electron")
        xboxManager.then(result => {
            //result is a objet class Xbox
            async function getInfoMcUser(){
                let infoMcUser = await result.getMinecraft()
                resolve(infoMcUser)
            }
            getInfoMcUser()

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
        root: "https://www.dropbox.com/scl/fi/9oa7l4wiqgjlhffankg3u/ModsPack.zip?rlkey=6uf7t26f7k5uysgzonxfixh1a&dl=dl=1",
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