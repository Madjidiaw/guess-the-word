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
let word = "magnolia";
// Place holder for all the letters the player guesses
let guessedLetters = [];
// Set a counter for a player's maximum allowed guesses
let remainingGuesses = 8;

const getWord = async function () {
    const fetchWord = await fetch (
        "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
    );
    const words = await fetchWord.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    lettersPlaceholder(word);
};
getWord();

// Add placeholders for each letter
const lettersPlaceholder = function (word) {
   const tempLetterHolder = [];
   for (let letter of word){
       console.log(letter);
       tempLetterHolder.push("●"); 
   };
   wordInProgress.innerText = tempLetterHolder.join(""); 
};

//lettersPlaceholder(word);

// Add event listener for guess button
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const enteredGuess = textInput.value;
    messageHolder.innerText = "";
    const validatedInput = validatePlayerInput(enteredGuess);
    if (validatedInput) {
        makeGuess(enteredGuess);
    };
    textInput.value = "";
});

// Validate the input of the button event handler 
const validatePlayerInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        messageHolder.innerText = "You did not enter a guess letter, try again!";
    } else if ( input.length > 1) {
        messageHolder.innerText = "Enter 1 (a single) letter, try again!";
    } else if (!input.match(acceptedLetter)) {
        messageHolder.innerText = "invalid entry, try again!";
    } else {
        return input;
    };
};

// Function to capture the player input
const makeGuess = function (enteredLetter) {
    enteredLetter = enteredLetter.toUpperCase()
    if (guessedLetters.includes(enteredLetter)) {
        messageHolder.innerText = "Already guessed that letter, try again";
    } else {
        guessedLetters.push(enteredLetter);
        console.log(guessedLetters);
        
        updatePlayerGuess();
        countRemainingGuess(enteredLetter);
        refreshWordInProgress(guessedLetters);
    };
    
};

// Function to show the guessed letters
const updatePlayerGuess = function () {
    listGuessedLetters.innerHTML = "";
    for (let letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        listGuessedLetters.append(li);
    };  
};

// Used to update the word in progress
const refreshWordInProgress = function (guessedLetters) {
    const wordUpp = word.toUpperCase();
    const wordArray = wordUpp.split("");
    const revealWord = [];
    for (let letter of wordArray){
        if (guessedLetters.includes(letter)) {
            let charToUpper = letter.toUpperCase();
            revealWord.push(charToUpper);
        } else {
        revealWord.push("●");
        };
    };    

    wordInProgress.innerText = revealWord.join("");
    whoWonTheGame(); 
    
};

// Count player remaining guesses
const countRemainingGuess = function (guess) {
    const wordToUpperCase = word.toUpperCase();
    if (!wordToUpperCase.includes(guess)) {
        messageHolder.innerText = `The word doesn't contain the letter ${guess}!`;
        
    } else {
        messageHolder.innerText = `Good guess! ${guess} is in the word!`;
    };
    remainingGuesses -=1;

    if (remainingGuesses === 0) {
        messageHolder.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        guessSpanInside.innerText = `You have ${remainingGuesses} guess remaining!`;
    } else if (remainingGuesses <= 8) {
        guessSpanInside.innerText = `${remainingGuesses} guesses left to play!`; 
    } else {
        startOver();
    };
};

// Check if the play won the game
const whoWonTheGame = function () {
    if (word.toUpperCase() === wordInProgress.innerText){
        messageHolder.classList.add("win");
        messageHolder.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
        startOver();
    }
};

// Hide button when the game ends and show the button for guess entry
function startOver () {
    guessButton.classList.add("hide");
    remainingGuess.classList.add('hide');
    listGuessedLetters.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

// Add click event listener to play again button which reset all elements
playAgainButton.addEventListener("click", function () {
    messageHolder.classList.remove("win");
    messageHolder.innerText = "";
    
    remainingGuesses = 8;
    guessedLetters = [];
    guessSpanInside.innerHTML = `${remainingGuesses} guesses`;

    guessButton.classList.remove("hide");
    playAgainButton.classList.add("hide");

    listGuessedLetters.innerHTML = "";
    
    listGuessedLetters.classList.remove("hide");
    remainingGuess.classList.remove("hide");
    
    // fetch a new word for the player to play again 
    getWord();
    
});
