const onHeadshotClick = () => {
  window.location.href = `https://jasonwa.ng`;
};

fetch("https://jasonwa.ng/stream/thoughts.md")
  .then((response) => response.text())
  .then((text) => {
    const parsed = marked.parse(text);
    const lookingGlassContainer = document.querySelector(".stream-container");
    lookingGlassContainer.innerHTML = parsed;
  });
