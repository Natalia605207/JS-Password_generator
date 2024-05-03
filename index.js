const lengthSlider = document.querySelector("#length-generator");
const options = document.querySelectorAll(".option-input");
const copyIcon = document.querySelector("#copy-icon");
const passwordInput = document.querySelector("#password-input");
const passwordStrength = document.querySelector(".password-strength");
const generateBtn = document.querySelector("#generate-btn");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%&|[](){}:;.,*+-#@<>~"
};

const generatePassword = () => {
    let staticPassword = "";
    let randomPassword = "";
    let excludeDuplicate = false;
    let passwordLength = lengthSlider.value;

    options.forEach((option) => {
    if (option.checked) {
        if (option.id !== "no-duplicate" && option.id !== "add-spaces") {
        staticPassword += characters[option.id];
        } else if (option.id === "spaces") {
        staticPassword += `  ${staticPassword}  `;
        } else {
        excludeDuplicate = true;
        }
    }
    });

    for (let i = 0; i < passwordLength; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
        !randomPassword.includes(randomChar) || randomChar == " "
        ? (randomPassword += randomChar)
        : i--;
    } else {
        randomPassword += randomChar;
    }
    }
    passwordInput.value = randomPassword;
};

const showPasswordStrength = () => {
    passwordStrength.id =
    lengthSlider.value <= 8
    ? "weak"
    : lengthSlider.value <= 16
    ? "medium"
    : "strong";
};

const updateSlider = () => {
    document.querySelector(".length-number").innerText = lengthSlider.value;
    generatePassword();
    showPasswordStrength();
};
updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
};

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);