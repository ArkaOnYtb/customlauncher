const barProgress = document.getElementById('barProgress')

window.instanceAPI.onLoadingStatus((_event, value) => {
  barProgress.style.width = value;
})


