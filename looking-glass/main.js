const onHeadshotClick = () => {
  window.location.href = `https://jasonwa.ng`;
};

fetch("https://jasonwa.ng/looking-glass/thoughts.md")
  .then((response) => response.text())
  .then((text) => {
    const parsedFile = marked.parse(text);

    const lookingGlassContainer = document.querySelector(
      ".looking-glass-container"
    );

    lookingGlassContainer.innerHTML = parsedFile;
  });
