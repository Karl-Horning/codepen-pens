/**
 * Function to handle key events and display key code.
 * @param {KeyboardEvent} e - The event object representing a keyboard event.
 */
const checkKeycode = (e) => {
    // Select the element with the class "keycode" to display the key code
    const cKeyCode = document.querySelector(".keycode");

    // Use the 'key' property for modern browsers and 'keyCode' as a fallback
    let key = e.key || String.fromCharCode(e.keyCode);

    // Replace space key representation
    key = key === " " ? "Space" : key;

    // Display the key and key code in the selected element
    cKeyCode.textContent = `${key}: ${e.keyCode}`;
};

// Use the 'keydown' event for better handling of non-character keys
document.addEventListener("keydown", checkKeycode);
