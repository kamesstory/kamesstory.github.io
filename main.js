/* ---------------------------------------------------------------
 *              Main javascript file for website
 * --------------------------------------------------------------- */

const onCohereLinkClick = () => window.open("https://cohere.so");

const onFacebookLinkClick = () =>
  window.open(
    "https://about.fb.com/news/2018/06/all-of-your-facebook-memories-are-now-in-one-place/"
  );
const onSiemensLinkClick = () =>
  window.open("https://www.plm.automation.siemens.com/");
const onFBNLinkClick = () =>
  window.open(
    "https://www.bloomberg.com/news/articles/2020-08-03/farmers-business-network-raises-funds-at-1-75-billion-valuation"
  );

const onLinkedinLinkClick = () =>
  window.open("https://linkedin.com/in/jason-hf-wang");

const onGithubLinkClick = () => window.open("https://github.com/kamesstory");

const onEmailLinkClick = () => window.open("mailto:jhw513@gmail.com");

const linkElements = document.querySelectorAll(".link");
const overlayElement = document.querySelector(".overlay-blur");

linkElements.forEach((e) => {
  e.addEventListener("mouseenter", () => {
    e.classList.add("focused-above-overlay");
    console.log(`adding focused above overlay`);
  });
  e.addEventListener("mouseleave", () => {
    e.classList.remove("focused-above-overlay");
    console.log(`removing focused above overlay`);
  });
});
