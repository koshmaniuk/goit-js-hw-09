const form = document.querySelector(".form")
form.addEventListener("submit", onStart)

function onStart(event) {
  event.preventDefault()
  let delay = +(event.target.elements.delay.value)
  let step = +(event.target.elements.step.value)
  let amount = +(event.target.elements.amount.value)
    if (amount < 0 || delay < 0 || step < 0) {
      console.log("Значення не можуть бути від'ємними.");
      return;
    }

    for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay) 
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    delay += step;
}
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay)
  })
}
