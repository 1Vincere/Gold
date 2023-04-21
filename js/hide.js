var elementClass = 'active';
var element = document.querySelector('.nav-menu');
window.addEventListener('scroll', function () {
  if (element.classList.contains(elementClass)) {
    element.classList.remove(elementClass);
  }
});
var elementClass2 = 'active';
var element2 = document.querySelector('.burger');
window.addEventListener('scroll', function () {
  if (element2.classList.contains(elementClass2)) {
    element2.classList.remove(elementClass2);
  }
});
