// Headshot click handler
function onHeadshotClick() {
  window.location.href = "../../index.html";
}

// Load and parse the essay
async function loadEssay() {
  try {
    // Check if marked is available
    if (typeof marked === "undefined") {
      console.error("marked.js library not loaded");
      document.getElementById("essay-content").innerHTML =
        "<p>Loading library...</p>";
      // Wait a bit and retry
      setTimeout(loadEssay, 500);
      return;
    }

    const response = await fetch("../introduction.md");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const markdown = await response.text();

    // Convert markdown to HTML
    let html = marked.parse(markdown);

    document.getElementById("essay-content").innerHTML = html;
  } catch (error) {
    console.error("Error loading essay:", error);
    document.getElementById("essay-content").innerHTML =
      "<p>Error loading essay content.</p>";
  }
}

// Load essay on page load
document.addEventListener("DOMContentLoaded", loadEssay);
