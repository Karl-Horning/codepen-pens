// script.js

/**
 * Adds an event listener to the window's load event and attaches an input event listener
 * to the wordCountTextarea to update the word count in the UI.
 */
window.addEventListener("load", () => {
    const textareaId = "wordCountTextarea";
    const wordCountElementId = "wordCountNumber";

    document.getElementById(textareaId).addEventListener("input", () => {
        updateWordCount(textareaId, wordCountElementId);
    });
});
