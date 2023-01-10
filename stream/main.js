const onHeadshotClick = () => {
  window.location.href = `https://jasonwa.ng`;
};

fetch("https://jasonwa.ng/stream/thoughts.md")
  .then((response) => response.text())
  .then((text) => {
    const parsed = marked.parse(text);
    const parsedWithClasses = parsed.replaceAll(
      `<a`,
      `<a class="link underlined"`
    );

    const lookingGlassContainer = document.querySelector(".stream-container");

    lookingGlassContainer.innerHTML = parsedWithClasses;
  });
