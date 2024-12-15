const playerEl = document.getElementById("player");
function embed(id) {
  playerEl.innerHTML = `<iframe
    id="ytplayer"
    type="text/html"
    width="480"
    height="480"
    src="https://www.youtube.com/embed/${id}?modestbranding=1&iv_load_policy=3"
    frameborder="0"
    allowfullscreen
  ></iframe>`;
}

const isValidId = (str) => /^[a-zA-Z0-9_-]{11}$/.test(str);

const urlBase1 = "youtu.be/";
const urlBase2 = "youtube.com/";
const urlEnds = ["shorts/", "embed/", "v/", "?v="];
/**
 * Extract the video ID from the input URL
 * @param {string} str
 */
function getIdFromInput(str) {
  if (str.includes(urlBase1)) {
    const id = str.split(urlBase1)[1].slice(0, 11);
    if (isValidId(id)) return id;
  }
  if (str.includes(urlBase2)) {
    const urlEnd = urlEnds.find((end) => str.includes(end));
    if (urlEnd) {
      const id = str.split(urlEnd)[1].slice(0, 11);
      if (isValidId(id)) return id;
    }
  }
  return null;
}

const inputEl = document.getElementById("v");
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  const input = inputEl.value.trim();
  console.log("isValidId(input):", isValidId(input));
  if (isValidId(input)) return true;
  const id = getIdFromInput(input);
  event.preventDefault();
  if (id) {
    const url = new URL(window.location);
    url.searchParams.set("v", id);
    window.location.href = url.toString();
  } else {
    alert("Please enter a valid YouTube URL or video ID.");
  }
  return false;
});

window.addEventListener("load", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("v");
  if (id && isValidId(id)) embed(id);
});
