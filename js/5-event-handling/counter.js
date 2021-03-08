'use strict'

function changeCounter() {
    myCounter.value = Number.parseInt(myCounter.value) + Number.parseInt(this.innerText);
}

minusFive.addEventListener('click', changeCounter);

minusOne.addEventListener('click', changeCounter);

resetButton.addEventListener('click', () => myCounter.value = 0);

plusOne.addEventListener('click', changeCounter);

plusFive.addEventListener('click', changeCounter);