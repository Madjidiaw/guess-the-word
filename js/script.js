// Unordered list to hold a player's guessed letter
const listGuessedLetters = document.querySelector(".guessed-letters");
// Button with the guess text
const guessButton = document.querySelector(".guess");
// Text input where player will guess a letter
const textInput  = document.querySelector(".letter");
// Empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
// Paragraph to display remaining guesses
const remainingGuess = document.querySelector(".remaining");
// Span inside the paragraph to display remaining guesses
const guessSpanInside = document.querySelector(".remaining span");
// Message holder when player guess a letter 
const messageHolder = document.querySelector(".message");
// Prompt player to try again
const playAgainButton = document.querySelector(".play-again");
// Starting word to test and initial response from the API
const word = "magnolia";
// Place holder for all the letters the player guesses
const guessedLetters = [];

// Add placeholders for each letter
const updateWordInProgress = function (word) {
   const tempLetterHolder = [];
   for (let letter of word){
       console.log(letter);
       tempLetterHolder.push("●"); 
   }
   wordInProgress.innerText = tempLetterHolder.join(""); 
};

updateWordInProgress(word);

// Add event listener for guess button
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const enteredGuess = textInput.value;
    enteredGuess.value = "";
    messageHolder.innerText = "";
    const validatedInput = validatePlayerInput(enteredGuess);
    console.log(validatedInput);
});

// Validate the input of the button event handler 
const validatePlayerInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input === "") {
        console.log("You did not enter a guess letter, try again!");
        //playAgainButton.classList.remove("hide");
    } else if ( input.length > 1) {
        console.log("Enter 1 letter, try again!");
    } else if (!input.match(acceptedLetter)) {
        console.log("invalid entry, try again!");
    } else {
        return input;
    };
};

// Function to capture the player input
const makeGuess = function (enteredLetter) {
    if (guessedLetters.contains(enteredLetter.toUpperCase())) {
        console.log(`Already guessed ${enteredLetter}, try again!`);
    } else {
        guessedLetters.push(enteredLetter.toUpperCase());
        updatePlayerGuess(guessedLetters);
    };
    console.log(guessedLetters);
    refreshWordInProgress(guessedLetters);
};

// Function to show the guessed letters
const updatePlayerGuess = function (guessedLetters) {
    listGuessedLetters.innerHTML = "";
    for (let letter of guessedLetters) {
        listGuessedLetters.push(letter);
        //console.log(listGuessedLetters);
    };  
};

// Used to update the word in progress
const refreshWordInProgress = function (guessedLetters) {
    const wordUpp = word.toUpperCase();
    const wordArray = wordUpper.split("");
    console.log(wordArray);
    for (let letter of wordArray)
    if (guessedLetters.contains(letter)) {
       let updateChar = letter;
       wordInProgress.append(updateChar);
    }  
    whoWonTheGame(); 
};

// Check if the play won the game
const whoWonTheGame = function (word) {
    if (){
        guessSpanInside.innerText = <p class="highlight">You guessed correct the word! Congrats!</p>
    }
}
//

