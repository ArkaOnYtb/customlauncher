const barProgress = document.getElementById('barProgress')

window.instanceAPI.onLoadingStatus((_event, value) => {
  barProgress.style.width = value;
})

const func = async () => {
            
  console.log("HEAD")
  let uuid = await window.instanceAPI.loadHeadIMG()
  console.log(uuid)

  var oldImg = document.getElementById('headImg');
  oldImg.src = `https://mc-heads.net/avatar/${uuid}/100`;

}
func()
