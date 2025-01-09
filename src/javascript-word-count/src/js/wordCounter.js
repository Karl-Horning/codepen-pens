// wordCounter.js

/**
 * Cleans and normalizes the input string by replacing line breaks, removing special characters,
 * and replacing multiple whitespace with a single space.
 *
 * @param {string} str - The input string to be cleaned.
 * @returns {string} The cleaned and normalized string.
 */
const cleanAndNormalize = (str) => {
    if (!str) {
        throw new Error(
            "Please provide a value as an argument for the cleanAndNormalize function."
        );
    }

    // Replace line breaks with space
    str = str.replace(/(?:\r\n|\r|\n)/g, " ");

    // Remove special characters except for alphanumeric and whitespace
    str = str.replace(/[^a-zA-Z0-9\s]/g, "");

    // Replace multiple whitespace with a single space
    str = str.replace(/\s+/g, " ");

    return str.trim();
};

/**
 * Counts the number of words in a cleaned and normalized string.
 *
 * @param {string} str - The cleaned and normalized string.
 * @returns {number} The number of words in the string.
 */
const wordCount = (str) => {
    return str.split(" ").length;
};

/**
 * Updates the word count in the UI based on the input textarea value.
 *
 * @param {string} textareaId - The ID of the textarea element.
 * @param {string} wordCountElementId - The ID of the element to display the word count.
 */
const updateWordCount = (textareaId, wordCountElementId) => {
    const elWordCountTextarea = document.getElementById(textareaId);
    const elWordCountValue = document.getElementById(wordCountElementId);
    let numberOfWords = 0;

    if (elWordCountTextarea.value) {
        const cleanedText = cleanAndNormalize(elWordCountTextarea.value);
        numberOfWords = wordCount(cleanedText);

        elWordCountValue.innerText = numberOfWords;
    } else {
        elWordCountValue.innerText = 0;
    }

    // Update the class based on the number of words
    elWordCountValue.classList.toggle("text-danger", numberOfWords < 1);
    elWordCountValue.classList.toggle("text-success", numberOfWords >= 1);
};
