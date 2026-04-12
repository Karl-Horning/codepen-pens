const passwordDisplay = document.querySelector(".password");

function getRandomInt(max) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    // Divide by 2^32 to get a float in [0, 1), avoiding modulo bias
    return Math.floor((array[0] / 0x100000000) * max);
}

// Generates a 15-character password in the format: XXX-XXX-XXX-XXX
function getPassword() {
    const chrs =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    let password = "";

    for (let i = 1; i < 16; i++) {
        password += i % 4 === 0 ? "-" : chrs[getRandomInt(chrs.length)];
    }

    return password;
}

function writePassword() {
    passwordDisplay.textContent = getPassword();
}

const copyBtn = document.getElementById("copy-btn");

copyBtn.addEventListener("click", () => {
    const text = passwordDisplay.textContent;
    if (!text) return;

    navigator.clipboard.writeText(text).then(() => {
        copyBtn.textContent = "Copied!";
        setTimeout(() => {
            copyBtn.textContent = "Copy";
        }, 2000);
    });
});

document.addEventListener("keyup", (e) => {
    if (e.key === " ") writePassword();
});

document.addEventListener("DOMContentLoaded", writePassword);
document.getElementById("btn").addEventListener("click", writePassword);
