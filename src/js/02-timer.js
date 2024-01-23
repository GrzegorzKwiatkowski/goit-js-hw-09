import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dateEl = document.getElementById('datetime-picker');
const startEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days');
const hoursEl = document.querySelector('[data-hours');
const minutesEl = document.querySelector('[data-minutes');
const secondsEl = document.querySelector('[data-seconds');

let currentDate = null;
let selectedDate = null;
let leftTime = null;

startEl.setAttribute('disabled', 'true');

const checkDate = () => {
  if (currentDate >= selectedDate) {
    window.alert('Please choose a date in the future');
  } else {
    startEl.removeAttribute('disabled');
    updateComponentsTimer(convertMs(leftTime));
  }
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    currentDate = new Date();
    leftTime = selectedDate - currentDate;
    console.log(leftTime);
    checkDate();
    onStart;
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = LeadingZero(Math.floor(ms / day));
  const hours = LeadingZero(Math.floor((ms % day) / hour));
  const minutes = LeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = LeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function updateComponentsTimer({ days, hours, minutes, seconds }) {
  daysEl.textContent = days.toString();
  hoursEl.textContent = hours.toString();
  minutesEl.textContent = minutes.toString();
  secondsEl.textContent = seconds.toString();
}

async function onStart() {
  for (let i = leftTime; i > 0; i -= 1000) {
    startEl.setAttribute('disabled', 'true');
    updateComponentsTimer(convertMs(i));
    await delay(1000);
  }
}

flatpickr(dateEl, options);
startEl.addEventListener('click', onStart);

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
function LeadingZero(value) {
  return String(value).padStart(2, '0');
}
