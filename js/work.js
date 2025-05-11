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


const imageCards = document.querySelectorAll('.row [data-category]');

links.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    // Update nav link active class
    links.forEach(l => l.classList.remove('active'));
    this.classList.add('active');

    const selectedCategory = this.getAttribute('data-category');

    // Update page title (optional)
    if (title) {
      title.textContent = selectedCategory;
    }

    // Filter image cards
    imageCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');

      if (selectedCategory === 'WORK' || selectedCategory === cardCategory) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// js/work.js
imagesLoaded('.row', function () {
  new Masonry('.row', {
    itemSelector: '.col-sm-6',
    percentPosition: true
  });
});
