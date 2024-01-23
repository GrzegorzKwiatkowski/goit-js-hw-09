const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

stopBtnEl.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const colorChanger = () => {
  bodyEl.style.backgroundColor = getRandomHexColor();
  stopBtnEl.disabled = false;
  startBtnEl.disabled = true;
  timer = setInterval(onStart, 1000);
};

const onStart = () => {
  bodyEl.style.backgroundColor = getRandomHexColor();
};

const freezeChanger = () => {
  clearInterval(timer);
  stopBtnEl.disabled = true;
  startBtnEl.disabled = false;
};

startBtnEl.addEventListener('click', colorChanger);
stopBtnEl.addEventListener('click', freezeChanger);
