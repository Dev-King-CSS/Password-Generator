//1. Declaring variables
const level = document.getElementById("level");
const number = document.getElementById("Number");
const uppercase = document.getElementById("includeUppercase");
const numbers = document.getElementById("includeNumbers");
const symbols = document.getElementById("includeSymbols");
const form = document.getElementById("Form");
const display = document.getElementById("password_Display");

//Sorting the numbers, symbols & uppercase letter in their specific variable
const UPPERCASE_LETTERS = sortingLettersFrom(65, 90);
const LETTERS = sortingLettersFrom(97, 122);
const NUMBER_LETTERS = sortingLettersFrom(48, 57);
const SYMBOL_LETTERS = sortingLettersFrom(33, 47)
  .concat(sortingLettersFrom(58, 64))
  .concat(sortingLettersFrom(91, 96))
  .concat(sortingLettersFrom(123, 126));

//Adding some event listeners
number.addEventListener("input", syncAmount);
level.addEventListener("input", syncAmount);

//Displaying the password when we click the button
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const Amount = number.value;
  const includeUppercase = uppercase.checked;
  const includeNumbers = numbers.checked;
  const includeSymbols = symbols.checked;
  const password = generatePassword(
    Amount,
    includeUppercase,
    includeNumbers,
    includeSymbols
  );
  display.innerText = password;
});

/* Creating the generatePassword function
It will create a random password for us keeping in mind the limit of length of password we want*/
function generatePassword(
  Amount,
  includeUppercase,
  includeNumbers,
  includeSymbols
) {
  let default_letters = LETTERS;
  if (includeUppercase)
    default_letters = default_letters.concat(UPPERCASE_LETTERS);
  if (includeSymbols) default_letters = default_letters.concat(SYMBOL_LETTERS);
  if (includeNumbers) default_letters = default_letters.concat(NUMBER_LETTERS);

  const password_letters = [];
  for (let i = 0; i < Amount; i++) {
    const characterCode =
      default_letters[Math.floor(Math.random() * default_letters.length)];
    password_letters.push(String.fromCharCode(characterCode));
  }
  return password_letters.join("");
}

//Here we r storing the types of different symbols, number,etc in the form of array
function sortingLettersFrom(low, high) {
  const array = [];
  for (let a = low; a <= high; a++) {
    array.push(a);
  }
  return array;
}

// Syncing the length of numbers we want
function syncAmount(e) {
  const value = e.target.value;
  number.value = value;
  level.value = value;
}
