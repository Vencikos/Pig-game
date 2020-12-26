'use strict';

// Selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const p0Score = document.getElementById('score--0');
const p1Score = document.getElementById('score--1');
const p0CurrentScore = document.getElementById('current--0');
const p1CurrentScore = document.getElementById('current--1');

// Selecting button elements
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const currentDice = document.querySelector('.dice');

let currentScore, activePlayer, scores, playing;

const init = function () {
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  playing = true;
  player1.classList.remove('player--active');
  player0.classList.add('player--active');
  p0Score.textContent = scores[0];
  p1Score.textContent = scores[1];
  p0CurrentScore.textContent = 0;
  p1CurrentScore.textContent = 0;
  currentDice.classList.add('hidden');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// When the page is loaded reset the score to 0 and hide the dice img
window.addEventListener('load', init());

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
    if (scores[activePlayer] >= 100) {
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

btnNew.addEventListener('click', init);
