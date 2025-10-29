const password = document.querySelector(".password");

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getPassword() {
    var password = "";
    var chrs = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    var randomChr;
    var randomNum;

    for (var i = 1; i < 16; i++) {
        if (i % 4 === 0) {
            password += "-";
        } else {
            randomNum = getRandomInt(chrs.length);
            randomChr = chrs[randomNum];
            password += randomChr;
        }
    }
    return password;
}

function writePassword() {
    let newPassword = getPassword();
    password.textContent = newPassword;
    console.log(newPassword);
}

function checkIfSpacebar(e) {
    if (e.keyCode == 32) {
        writePassword();
    }
}

document.addEventListener("keyup", checkIfSpacebar);
document.addEventListener("DOMContentLoaded", writePassword);
document.getElementById("btn").onclick = writePassword;
