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
  const msnry = new Masonry(grid, {
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
        card.style.display = match ? 'block' : 'none';
      });

      // Trigger layout update after DOM paints
      requestAnimationFrame(() => {
        msnry.reloadItems();
        imagesLoaded(grid, () => {
          msnry.layout();
        });
      });
    });

    document.addEventListener("DOMContentLoaded", function () {
  const artGallery = document.querySelector("#art-gallery");
  const masonryInstance = new Masonry(artGallery, {
    itemSelector: ".col-sm-6",
    percentPosition: true,
  });

  const categoryLinks = document.querySelectorAll("#work-categories .nav-link");
  categoryLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const category = this.getAttribute("data-category");

      document.querySelectorAll("#art-gallery .col-sm-6").forEach((item) => {
        if (category === "WORK" || item.getAttribute("data-category").includes(category)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });

      // Trigger Masonry layout again
      masonryInstance.layout();
    });
  });
});

  });
});
