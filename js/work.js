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

// Main logic
document.addEventListener("DOMContentLoaded", function () {
  const grid = document.querySelector('[data-masonry]');
  const title = document.getElementById('work-title');
  const links = document.querySelectorAll('#work-categories .nav-link');
  const cards = grid ? grid.querySelectorAll('.col-sm-6') : [];

  if (!grid || cards.length === 0) return;

  // Initialize Masonry
  let msnry = new Masonry(grid, {
    itemSelector: '.col-sm-6',
    percentPosition: true
  });

  // Ensure layout once images are loaded
  imagesLoaded(grid, function () {
    msnry.layout();
  });

  // Handle category filtering
  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      // Update active state on nav
      links.forEach(l => l.classList.remove('active'));
      this.classList.add('active');

      const selectedCategory = this.dataset.category;

      // Update title if available
      if (title) {
        title.textContent = selectedCategory;
      }

      // Show/hide cards
      cards.forEach(card => {
        const categories = card.dataset.category.split(',');
        const match = selectedCategory === 'WORK' || categories.includes(selectedCategory);
        
        if (match) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });

      // Destroy Masonry & reinitialize for proper layout
      msnry.destroy();
      msnry = new Masonry(grid, {
        itemSelector: '.col-sm-6',
        percentPosition: true
      });

      imagesLoaded(grid, () => {
        msnry.layout();
      });
    });
  });
});
