// Get the button
const backToTopButton = document.getElementById("backToTop");

// Show the button when scrolling down
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) { // Show when scrolled 200px down
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
});

// Scroll to the top when the button is clicked
backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth" // Smooth scrolling effect
  });
});
