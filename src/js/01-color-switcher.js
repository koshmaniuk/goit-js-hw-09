const screen = document.querySelector("body")

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

startBtn.addEventListener("click", startClick)
stopBtn.setAttribute("disabled", true);

function startClick() {
    const timerId = setInterval(() => {
        screen.style.backgroundColor = getRandomHexColor();
        startBtn.setAttribute("disabled", true);
        stopBtn.removeAttribute("disabled");
    }, 1000);

    stopBtn.addEventListener("click", stopClick)
    function stopClick() {
        startBtn.removeAttribute("disabled");
        stopBtn.setAttribute("disabled", true);
        clearInterval(timerId)
    }
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  } 