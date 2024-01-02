// score
let scoreReference = document.querySelector('#score');
let failReference = document.querySelector('#fail');

let score = 0; 
let fail = 0;

// card class
class Card {
    constructor(image, revealed, foundPair) {
        this.image = image;
        this.revealed = revealed;
        this.foundPair = foundPair;
    }
}

// count revealed cards 

let revealedCards = 0;

// get card references to HTML
let allCards = document.querySelectorAll('.card');
let card1HTML = document.querySelector('#card1');
let card2HTML = document.querySelector('#card2');
let card3HTML = document.querySelector('#card3');
let card4HTML = document.querySelector('#card4');
let card5HTML = document.querySelector('#card5');
let card6HTML = document.querySelector('#card6');

let references = [card1HTML, card2HTML, card3HTML, card4HTML, card5HTML, card6HTML];

// card pairs
let officialPairs;

// check if pair is correct
let currentPair = [];

// create card objects
let card1 = null;
let card2 = null;
let card3 = null;
let card4 = null;
let card5 = null;
let card6 = null;

let cards = [card1, card2, card3, card4, card5, card6];

// get button 
let button = document.querySelector('#btn');

// get message
messageText = document.querySelector('.message');


// Function to get a random integer within a range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
// Function to get pairs
function getPairs() {
    let indices = [0, 1, 2, 3, 4, 5];
    let pairs = [];
    while (indices.length > 0) {
      let index1 = getRandomInt(0, indices.length - 1);
      let val1 = indices[index1];
      indices.splice(index1, 1);
  
      let index2 = getRandomInt(0, indices.length - 1);
      let val2 = indices[index2];
      indices.splice(index2, 1);
  
      pairs.push([val1, val2]);
    }
    officialPairs = pairs;
    return pairs;
  }
  
  
  function initialize() {
      // reset score and fail
      score = 0;
      fail = 0;
      scoreReference.innerHTML = score;
      failReference.innerHTML = fail;

      // reset message
      messageText.innerHTML = 'Pick 2 Cards';

      // Get three pairs
      let pairs = getPairs();
  
      // array of images
      let images = [];
      images.push('angular.svg');
      images.push('js-badge.svg');
      images.push('react.svg');
  
      // create cards 
      for (let i = 0; i < pairs.length; i++) {
          const pair = pairs[i];
          let image = images.pop();
          cards[pair[0]] = new Card(image, false, false);
          cards[pair[1]] = new Card(image, false, false);
      }

      for (let index = 0; index < references.length; index++) {
        let indexedCard = references[index];
        indexedCard.style.backgroundImage = 'none';
        indexedCard.style.backgroundColor = 'blueviolet';
      }
    
      for (let index = 0; index < cards.length; index++) {
        let indexedCard = cards[index];
        indexedCard.revealed = false;
      }

    // reset moves
    revealedCards = 0

    //reset current pair
    currentPair = [];
  }

 

  
  
  button.addEventListener('click', initialize);
  window.onload = initialize;

  function revealCards(card) {
    let classCard = cards[card.getAttribute("data-number")];
    // stop if Card is already revealed or pair is found 
    if (classCard.foundPair == true || classCard.revealed == true) {
      return;
    }
    messageText.innerHTML = 'Pick 2 Cards';
    revealedCards++;
    if (revealedCards % 3 == 0) {
        for (let index = 0; index < references.length; index++) {
            let indexedCard = references[index];
            let indexedClassCard = cards[indexedCard.getAttribute("data-number")];
            if (indexedClassCard.foundPair == false) {
              indexedCard.style.backgroundImage = 'none';
              indexedCard.style.backgroundColor = 'blueviolet';
            }
            if (indexedClassCard.revealed == true) {
                indexedClassCard.revealed = false;
                revealedCards--;
            }
        }
    }
    card.style.backgroundImage = `url(${classCard.image})`;
    card.style.backgroundColor = '#282b30';
    classCard.revealed = true;
    message(card);
   
  }

  function message(card) {
    currentPair.push(Number(card.getAttribute("data-number")));
    if (currentPair.length == 2) {
        const containsSpecificArray1 = officialPairs.some(array => {
            return JSON.stringify(array) == JSON.stringify(currentPair);
        });

        const containsSpecificArray2 = officialPairs.some(array => {
            return JSON.stringify(array) == JSON.stringify(currentPair.slice().reverse());
        });

        if (containsSpecificArray1 || containsSpecificArray2) { // found correct pair 
            console.log('nice');
            // keep showing correct pair of cards 
            for (let i = 0; i < cards.length; i++) {
              const card = cards[i];
              if (card.revealed) {
                card.foundPair = true;
              }
            }
            score++;
            scoreReference.innerHTML = score;
            if (score == 3) {
              messageText.innerHTML = 'You win!'
            } else {
              messageText.innerHTML = 'Nice!'
            }
          
        } else {  // pair is not correct 
            messageText.innerHTML = 'Try Again!'
            fail++;
            failReference.innerHTML = fail;
        }
        currentPair = [];
    }
  }

  allCards.forEach(function(card) {
    card.addEventListener('click', function() {
        revealCards(card);
    });
  });

 