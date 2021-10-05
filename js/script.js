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

// Add placeholders for each letter
const updateWordInProgress = function (word) {
   const tempLetterHolder = [];
   for (let letter of word){
       tempLetterHolder.push("●"); 
   }
   wordInProgress.innerText = tempLetterHolder.join(""); 
};

updateWordInProgress(word);

// Add event listener for guess button
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const enteredGuess = e.target.value;
    //enteredGuess = "";
});

