const cleanAndNormalize = (str) =>
    str
        .replace(/(?:\r\n|\r|\n)/g, " ")
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .replace(/\s+/g, " ")
        .trim();

const wordCount = (str) => {
    if (!str) return 0;
    return str.split(" ").length;
};

const textarea = document.getElementById("wordCountTextarea");
const countEl = document.getElementById("wordCountNumber");

const updateWordCount = () => {
    const count = textarea.value
        ? wordCount(cleanAndNormalize(textarea.value))
        : 0;

    countEl.textContent = count;
    countEl.classList.toggle("has-words", count >= 1);
};

textarea.addEventListener("input", updateWordCount);
