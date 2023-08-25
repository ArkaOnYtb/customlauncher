
window.instanceAPI.onLoadingStatus((event, value) => {
  const barProgress = document.getElementById('barProgress')

  barProgress.style.width = value;
  console.log("Super valeur: " + value)
})

const func = async () => {
            
  console.log("HEAD")
  let uuid = await window.instanceAPI.loadHeadIMG()
  console.log(uuid)

  var oldImg = document.getElementById('headImg');
  oldImg.src = `https://mc-heads.net/avatar/${uuid}/100`;

}
func()
