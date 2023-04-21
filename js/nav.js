let navSlide = () => {
  let burger = document.querySelector('.burger');
  let navMenu = document.querySelector('.nav-menu');
  let navlinks = document.querySelectorAll('.nav-menu li');

  burger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    navlinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinksFade 0.5s ease forwards ${
          index / 5 + 0.5
        }s`;
      }
    });

    burger.classList.toggle('active');
  });
};
navSlide();

function toggleClassOnClick(targetId, triggerId, classToAdd) {
  const targetElement = document.getElementById(targetId);
  const triggerElement = document.getElementById(triggerId);

  function removeClass() {
    targetElement.classList.remove(classToAdd);
  }

  // Add class on click
  triggerElement.addEventListener('click', function (e) {
    e.stopPropagation(); // Prevent click event from bubbling up to document
    targetElement.classList.toggle(classToAdd);
  });

  // Remove class on scroll
  window.addEventListener('scroll', removeClass);

  // Remove class on click outside
  document.addEventListener('click', function (e) {
    if (e.target !== triggerElement && !targetElement.contains(e.target)) {
      removeClass();
    }
  });
}
toggleClassOnClick('services', 'servClick', 'active');
