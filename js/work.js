// Load navbar and footer
fetch("navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar-container").innerHTML = data;
  });

fetch("footer.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("footer-container").innerHTML = data;
  });

// Run after DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // Category switching logic
  const links = document.querySelectorAll('#work-categories .nav-link');
  const title = document.getElementById('work-title');

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      links.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      if (title) {
        title.textContent = this.getAttribute('data-category');
      }
    });
  });

  // Masonry layout
  const grid = document.querySelector('.row');
  if (grid) {
    imagesLoaded(grid, function () {
      new Masonry(grid, {
        itemSelector: '.col-sm-6',
        percentPosition: true
      });
    });
  }
});
