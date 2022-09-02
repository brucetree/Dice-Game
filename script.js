'use strict';
// select elements
const score00 = document.querySelector('#score--0');
const score01 = document.querySelector('#score--1');
const current00 = document.querySelector('#current--0');
const current01 = document.querySelector('#current--1');
const dice = document.querySelector('.dice');

const player00 = document.querySelector('.player--0');
const player01 = document.querySelector('.player--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//initialize the first player
let playing, current_Number, scores, activePlayer;

const init = () => {
    playing = true;
    current_Number = 0;
    scores = [0, 0];
    activePlayer = 0;

    score00.textContent = 0;
    score01.textContent = 0;
    current00.textContent = 0;
    current01.textContent = 0;

    dice.classList.add('hidden');
    player00.classList.remove('player--winner');
    player01.classList.remove('player--winner');
    player00.classList.add('player--active');
    player01.classList.remove('player--active');
}
init();

const switchPlayer = () => {
    // switch to next player
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    current_Number = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player00.classList.toggle('player--active');
    player01.classList.toggle('player--active');
}


// Rolling dice functionnality
btnRoll.addEventListener('click', function () {
    if (playing) {
        // generate a random dice roll from 1-6
        const diceNum = Math.trunc(Math.random() * 6) + 1;
        // display dice
        dice.classList.remove('hidden');
        dice.src = `dice-${diceNum}.png`;

        // check for rolled 1
        if (diceNum !== 1) {
            // add dice to current score
            current_Number += diceNum

            document.querySelector(`#current--${activePlayer}`).textContent = current_Number;

        } else {
            // switch to next player
            switchPlayer()

        }
    }
})

// holding score function
btnHold.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += current_Number
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
        // switch to next player
        if (scores[activePlayer] >= 20) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            dice.classList.add('hidden');
        } else {
            switchPlayer();
        }
    }

})

// New game function
btnNew.addEventListener('click', init)