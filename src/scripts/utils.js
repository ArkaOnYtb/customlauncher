const electron = require('electron')

function showAlert(x, y, text) {

    let alert = document.createElement("p")

    alert.style.position = 'absolute'
    alert.style.left = x
    alert.style.top = y

    alert.textContent = text
    alert.classList.add("alert")
    document.getElementById("alerts").appendChild(alert)
    alert.style.content = args[1]
    alert.style.display = 'inline-block'
    setTimeout(() => alert.remove, 4000)

}

// open a new tab in the default browser, with the link as the website link
function openBrowser(link) {
    electron.shell.openExternal(link)
}

// save the storage parameter in the storage.json file
function saveStorage(storage) {
    fs.writeFileSync('../storage.json', JSON.stringify(storage, null, 2), err => console.log(err))
}

module.exports = {
    showAlert: showAlert,
    openBrowser: openBrowser,
    saveStorage: saveStorage
}