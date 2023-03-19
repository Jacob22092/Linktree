document.addEventListener("mousemove", parallax);
function parallax(e) {
  const background = document.querySelector(".background");

  const offsetX = (window.innerWidth / 2 - e.pageX) * 0.1;
  const offsetY = (window.innerHeight / 2 - e.pageY) * 0.1;

  background.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
}
