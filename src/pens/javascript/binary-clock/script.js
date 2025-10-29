/**
 * Event listener to start the clock on page load.
 * Updates the clock every second using the `setInterval` function.
 */
document.addEventListener("DOMContentLoaded", () => {
    setInterval(clock, 1000);
});

/**
 * Converts a decimal number to binary and pads it with zeros to reach the specified length.
 *
 * @param {number} number - The decimal number to convert to binary.
 * @param {number} length - The desired length of the binary representation.
 * @returns {string} - The binary representation of the decimal number.
 */
const decimalToBinary = (number, length) => {
    return number.toString(2).padStart(length, "0");
};

/**
 * Gets the binary representation of the current time.
 *
 * @param {number} hours - The current hour.
 * @param {number} minutes - The current minute.
 * @param {number} seconds - The current second.
 * @returns {string[]} - An array containing the binary representation of hours, minutes, and seconds.
 */
const getBinaryTime = (hours, minutes, seconds) => {
    return [hours, minutes, seconds].map((unit) => decimalToBinary(unit, 6));
};

/**
 * Updates the clock on the webpage with the binary representation of the current time.
 */
const clock = () => {
    // Get the clock element from the DOM
    const elClock = document.getElementById("clock");

    // Get the current time
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    // Get the binary representation of the current time
    const hms = getBinaryTime(hours, minutes, seconds);

    // Update the clock element with the binary representation
    elClock.innerHTML = hms.map((binary) => `<h2>${binary}</h2>`).join("");
};
