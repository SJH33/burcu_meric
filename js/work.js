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
  const gallery = document.getElementById("art-gallery");
  const links = document.querySelectorAll("#work-categories .nav-link");

  if (!gallery) return;

  // Load artwork dynamically from JSON
  fetch("artworks.json")
    .then(response => response.json())
    .then(artworks => {
      gallery.innerHTML = ""; // Clear existing items

      artworks.forEach(art => {
        const categories = art.categories.join(",");
        const artElement = document.createElement("div");
        artElement.classList.add("col-sm-6", "col-lg-4", "mb-4");
        artElement.setAttribute("data-category", categories);
        artElement.innerHTML = `
          <div class="card">
            <img src="${art.src}" alt="${art.alt}" class="card-img-top">
          </div>
        `;
        gallery.appendChild(artElement);
      });

      initializeMasonry();
    });

  function initializeMasonry() {
    let msnry = new Masonry(gallery, {
      itemSelector: ".col-sm-6",
      percentPosition: true
    });

    imagesLoaded(gallery, function () {
      msnry.layout();
    });

    setupFiltering();
  }

  function setupFiltering() {
    links.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        // Update active state on nav
        links.forEach(l => l.classList.remove("active"));
        this.classList.add("active");

        const selectedCategory = this.dataset.category;
        const cards = gallery.querySelectorAll(".col-sm-6");

        cards.forEach(card => {
          const categories = card.dataset.category.split(",");
          const match = selectedCategory === "All" || categories.includes(selectedCategory);

          card.style.display = match ? "block" : "none";
        });

        // Refresh Masonry layout
        imagesLoaded(gallery, () => {
          msnry.layout();
        });
      });
    });
  }
});
