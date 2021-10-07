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
const guessedLetters = [];
// Set a counter for a player's maximum allowed guesses
const remainingGuesses = 8;

const getWord = async function () {
    const fetchWord = await fetch (
        "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
    );
    const words = await fetchWord.text();
    const wordArray = words.split("\n");
    //console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    //word = randomword;
    lettersPlaceholder(word);
};
getWord();

// Add placeholders for each letter
const lettersPlaceholder = function (word) {
   const tempLetterHolder = [];
   for (let letter of word){
       console.log(letter);
       tempLetterHolder.push("●"); 
   }
   wordInProgress.innerText = tempLetterHolder.join(""); 
};

lettersPlaceholder(word);

// Add event listener for guess button
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const enteredGuess = textInput.value;
    //enteredGuess.value = "";
    messageHolder.innerText = "";
    const validatedInput = validatePlayerInput(enteredGuess);
    //console.log(validatedInput);
    if (validatedInput) {
        makeGuess(enteredGuess);
    }
    textInput.value = "";
});

// Validate the input of the button event handler 
const validatePlayerInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        messageHolder.innerText = "You did not enter a guess letter, try again!";
        //playAgainButton.classList.remove("hide");
    } else if ( input.length > 1) {
        messageHolder.innerText = "Enter 1 letter, try again!";
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
        //messageHolder.innerText = `Already guessed ${enteredLetter}, try again!`;
        messageHolder.innerText = "Already guessed that letter, try again";
    } else {
        guessedLetters.push(enteredLetter);
        console.log(guessedLetters);
        
        updatePlayerGuess();
        countRemainingGuess(guessedLetters);
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
        //console.log(listGuessedLetters);
    };  
};

// Used to update the word in progress
const refreshWordInProgress = function (guessedLetters) {
    const wordUpp = word.toUpperCase();
    const wordArray = wordUpp.split("");
    const revealWord = [];
    //console.log(wordArray);
    for (let letter of wordArray){
        if (guessedLetters.includes(letter)) {
            let updateChar = letter;
            revealWord.push(updateChar);
        } else {
        revealWord.push("●");
        };
    };    
    //console.log(revealWord);
    wordInProgress.innerText = revealWord.join("");
    whoWonTheGame(); 
};

// Count player remaining guesses
const countRemainingGuess = function (guess) {
    const wordToUpperCase = getWord().toUpperCase;
    if (!wordToUpperCase.includes(guess)) {
        guessedLetters.append(guess);
        messageHolder.innerText = "The word doesn't contain the letter!";
        remainingGuesses -= 1;
    } else {
        messageHolder.innerText = "The letter is already in the word, try again!";
    };
    if (remainingGuesses === 0) {
        messageHolder.innerText = `The game is over, the word is ${wordToUpperCase}!`;
    } else if (remainingGuesses === 1) {
        //guessSpanInside.innerText = `<p class="highlight">You have <strong>one</strong> guess remaining!</p>`;
        guessSpanInside.innerText = `You have <strong>one</strong> guess remaining!`;
    }
};

// Check if the play won the game
const whoWonTheGame = function () {
    if (word.toUpperCase() === wordInProgress.innerText){
        messageHolder.classList.add("win");
        guessSpanInside.innerText = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};


