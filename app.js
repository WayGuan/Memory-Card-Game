// This is a memory card game created using only Javascript and HTML.
// This js file collects user information. and create a matching game based on the user information. 
// Choosing higher skill level will start a game with more cards.
// Author: Weiwei, Created on June 8, 2021  

// [Something extra to work on]: can make the help section as a popup

// load event listener
window.addEventListener('load', function () {
    document.forms.infoForm.addEventListener('submit', function (event) {
        // declare instant variables for storing the user information
        let name;
        let age;
        let favoriteColor;
        let skillLevel;

        // submit event listener to prevent the form from submitting

        event.preventDefault();
        console.log("submit button clicked");
        infoForm.style.display = 'none';
        gameDiv.style.display = 'block';
        name = document.getElementById('nameInput').value;
        age = document.getElementById('ageInput').value;
        favoriteColor = document.getElementById('favColor').value;
        skillLevel = document.getElementById('skillLevel').value;

        // get the values from the form, and display in the new game section
        document.getElementById('welcomeUser').innerHTML = ("Hello " + name + ". Welcome to the matching game.<br>" + "You are " + age + " years old. And your skill level is " + skillLevel + ".<br>" + "The game background color is set to your favorite color: " + favoriteColor + ".");

        // call the createGame method to create the game
        document.getElementById('gameSection').style.backgroundColor = favoriteColor;


        //cards options library
        const cardArrayLibrary = [{
                name: 'elephant',
                img: "images/elephant.png",
            },
            {
                name: 'giraffe',
                img: "images/giraffe.png",
            },
            {
                name: 'hippo',
                img: "images/hippo.png",
            },
            {
                name: 'monkey',
                img: "images/monkey.png",
            },
            {
                name: 'panda',
                img: "images/panda.png",
            },
            {
                name: 'parrot',
                img: "images/parrot.png",
            },
        ]

        // create an array of different set of cards based on doubling the skill level
        let cardArray = cardArrayLibrary.slice(0, parseInt(skillLevel) * 2);
        // append the array with its own duplicate
        let dup = cardArray;
        dup.forEach(element => {
            cardArray.push(element);
        });

        // sort the cardArray randomly
        cardArray.sort(() => 0.5 - Math.random());

        // get the elements, and create the game
        let game = document.getElementById("gameSection");
        let cardsPicked = []; // cards picked
        let cardsPickedId = []; // id of picked cards
        const gameResult = document.querySelector('#gameResult');
        var cardsMatch = []; // cards that user found match
        createGame();

        // this function create a group of img elements, and append to the gameSection div
        function createGame() {
            for (let index = 0; index < cardArray.length; index++) {
                let card = document.createElement('img');
                card.setAttribute('src', 'images/cardback.jpg');
                card.setAttribute('cardId', index);
                card.addEventListener('click', flipCard);
                game.appendChild(card);
            }
        }

        //this function is to flip 2 cards, and call the checkMatch function to check if they match
        function flipCard() {
            if (this.getAttribute('src') == 'images/cardback.jpg') { // only flip the card when it is showing the cardback image. If the card is already flipped, do nothing. This prevent clicking the same card twice and get a match.
                var cardId = this.getAttribute('cardId');
                cardsPicked.push(cardArray[cardId].name);
                cardsPickedId.push(cardId);
                this.setAttribute('src', cardArray[cardId].img);
            }
            // if two cards are picked, check the match
            if (cardsPicked.length == 2) {
                setTimeout(checkMatch, 500);
            }
        }

        //check if two selected cards match
        function checkMatch() {
            var cards = document.querySelectorAll("img");
            const cardOneId = cardsPickedId[0];
            const cardTwoId = cardsPickedId[1];
            if (cardsPicked[0] === cardsPicked[1]) {
                cardsMatch.push(cardsPicked) // if match, add to the cardsMatch array

                // remove the click event listener to prevent increasing the matched pairs when picked again after it is already found to be a match.
                cards[cardOneId].removeEventListener('click', flipCard);
                cards[cardTwoId].removeEventListener('click', flipCard);
            } else { //if not matching, set the image back to cardback image
                cards[cardOneId].setAttribute('src', 'images/cardback.jpg');
                cards[cardTwoId].setAttribute('src', 'images/cardback.jpg');
            }
            // clear the cardsPicked and cardsPickedId array
            cardsPicked = [];
            cardsPickedId = [];
            gameResult.textContent = "You have found " + cardsMatch.length + " pairs.";
            if (cardsMatch.length === cardArray.length / 2) {
                gameResult.textContent = 'Congratulations! You found them all!';
            }
        }
    })
})
// this function is for HELP button to toggle the help information when clicked   
// [Bug-fixed]: after game first loaded, HELP button has to be clicked twice to make the help information session visible. VISIBILITY INITIAL VALUE IS "" 
function toggleHelpInfo() {
    let helpInfoNode = document.getElementById('helpInfo');
    console.log(helpInfoNode.style.visibility);
    helpInfoNode.style.visibility = (helpInfoNode.style.visibility === 'hidden' || helpInfoNode.style.visibility === '') ? 'visible' : 'hidden';
}