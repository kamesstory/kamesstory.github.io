/* ---------------------------------------------------------------
 *              Main javascript file for website
 * --------------------------------------------------------------- */

const loadImageOnMouseOver = () => {
  const imageContainer = document.getElementsByClassName("mountains-img-container")[0];
  imageContainer.onmouseover = () => {
    
  }
}

document.addEventListener("DOMContentLoaded", function(){
  // Handler when the DOM is fully loaded
  loadImageOnMouseOver();
});