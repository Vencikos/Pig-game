'use strict';

// Selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const p0Score = document.getElementById('score--0');
const p1Score = document.getElementById('score--1');
const p0CurrentScore = document.getElementById('current--0');
const p1CurrentScore = document.getElementById('current--1');
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const currentDice = document.querySelector('.dice');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// When the page is loaded reset the score to 0 and hide the dice img
window.addEventListener('load', function (e) {
  p0Score.textContent = 0;
  p1Score.textContent = 0;
  currentDice.classList.add('hidden');
});

// Rolling dice

btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generate random dice
    const dice = Math.trunc(Math.random() * 6 + 1);

    // Display dice
    currentDice.classList.remove('hidden');
    currentDice.setAttribute('src', `Images/dice-${dice}.png`);

    // Check if the roll is 1
    if (dice !== 1) {
      // Add dice to the current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // Check if the roll is 1 - if true switch to next player
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0.classList.toggle('player--active');
      player1.classList.toggle('player--active');
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to active player's score

    scores[activePlayer] += currentScore;
    // scores[0] = scores[0] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Check if score >= 100
    if (scores[activePlayer] >= 20) {
      //Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      currentDice.classList.add('hidden');
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  document.querySelector(`.player--1`).classList.remove('player--active');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.getElementById(`score--0`).textContent = scores[0];
  document.getElementById(`score--0`).textContent = scores[1];
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
});
