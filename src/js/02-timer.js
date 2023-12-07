import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const selector = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("button[data-start]")
const time = {
    days : document.querySelector("span[data-days]"),
    hours : document.querySelector("span[data-hours]"),
    minutes : document.querySelector("span[data-minutes]"),
    seconds : document.querySelector("span[data-seconds]")
    };
startBtn.setAttribute("disabled", true);


    const options = {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose(selectedDates) {

        let currentDate = new Date().getTime();
        const finalDate = selectedDates[0].getTime();
    
        if (finalDate < currentDate) {
          window.alert("Please choose a date in the future");
        } 

        else {
          startBtn.removeAttribute("disabled");
          startBtn.addEventListener("click", startCount);

          function startCount() {
            const timerId = setInterval(() => {
              let currentDate = new Date().getTime();
              let timeDifference = finalDate - currentDate;
              let finalDateLeft = convertMs(timeDifference)
              time.days.textContent = addLeadingZero(finalDateLeft.days);
              time.hours.textContent = addLeadingZero(finalDateLeft.hours);
              time.minutes.textContent = addLeadingZero(finalDateLeft.minutes);
              time.seconds.textContent = addLeadingZero(finalDateLeft.seconds);
              if (timeDifference < 1000) {
                clearInterval(timerId);
              }
            }, 1000);
          }
        }
      }
    };

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
    
flatpickr(selector, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
