let count = -101
document.querySelector('#app1').addEventListener('click', function () {
  debugger
  this.textContent = count++
})
