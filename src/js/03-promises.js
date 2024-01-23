import Notiflix from 'notiflix';

const delayEl = document.querySelector('[name="delay"]');
const stepEl = document.querySelector('[name="step"]');
const amountEl = document.querySelector('[name="amount"]');
const createBtnEl = document.querySelector('button');

createBtnEl.addEventListener('click', promiseLoop);

function promiseLoop(event) {
  event.preventDefault();
  let amount = amountEl.value;
  let step = stepEl.value;
  let delay = delayEl.value;
  for (let i = 1; i <= amount; i++) {
    let position = i;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌Rejected promise ${position} in ${delay}ms`);
      });
    delay = Number(delay) + Number(step);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
