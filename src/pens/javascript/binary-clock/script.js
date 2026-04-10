document.addEventListener("DOMContentLoaded", () => {
    setInterval(clock, 1000);
});

/**
 * Converts a decimal number to a zero-padded binary string.
 *
 * @param {number} number
 * @param {number} length
 * @returns {string}
 */
const decimalToBinary = (number, length) => {
    return number.toString(2).padStart(length, "0");
};

/**
 * Returns the binary representations of hours, minutes, and seconds.
 *
 * @param {number} hours
 * @param {number} minutes
 * @param {number} seconds
 * @returns {string[]}
 */
const getBinaryTime = (hours, minutes, seconds) => {
    return [hours, minutes, seconds].map((unit) => decimalToBinary(unit, 6));
};

/**
 * Updates the clock display.
 *
 * The container's aria-label provides the plain-language time for screen
 * readers. Each row's aria-label spaces the binary digits so they are
 * announced individually rather than as a number.
 */
const clock = () => {
    const elClock = document.getElementById("clock");

    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    const pad = (n) => String(n).padStart(2, "0");
    elClock.setAttribute(
        "aria-label",
        `Binary clock. Current time: ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    );

    const hms = getBinaryTime(hours, minutes, seconds);
    const labels = ["Hours", "Minutes", "Seconds"];
    elClock.innerHTML = hms
        .map(
            (binary, i) =>
                `<p aria-label="${labels[i]}: ${binary.split("").join(" ")}">${binary}</p>`
        )
        .join("");
};
