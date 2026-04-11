(() => {
    const pressed = [];
    const secretCode = "wooooooooooo";
    const searchButton = document.getElementById("search-button");
    const stringToFormatInput = document.getElementById("string-to-format");

    const handleSecretCodeCheck = (e) => {
        pressed.push(e.key);
        pressed.splice(
            -secretCode.length - 1,
            pressed.length - secretCode.length
        );
        if (pressed.join("").includes(secretCode)) {
            cornify_add();
        }
    };

    /**
     * Converts a string to snake_case.
     *
     * @param {string} str - The input string.
     * @returns {string}
     * @example
     * toSnakeCase('This is  a   _sample-string  with--special___characters! and hyphens_');
     * // => 'this_is_a_sample_string_with_special_characters_and_hyphens'
     */
    const toSnakeCase = (str) => {
        return str
            .replace(/([A-Z])/g, " $1")
            .replace(/-+/g, "-")
            .replace(/[\s-]+/g, "_")
            .replace(/[^\w\s]|_/g, "_")
            .replace(/_+/g, "_")
            .replace(/^[^a-zA-Z0-9]+/, "")
            .replace(/[^a-zA-Z0-9]+$/, "")
            .toLowerCase();
    };

    /**
     * Converts a string to kebab-case.
     *
     * @param {string} str - The input string.
     * @returns {string}
     */
    const toKebabCase = (str) => {
        return str
            .replace(/([A-Z])/g, " $1")
            .replace(/-+/g, "-")
            .replace(/[\s_]+/g, "-")
            .replace(/[^\w\s-]|_/g, "")
            .replace(/-+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, "")
            .toLowerCase();
    };

    /**
     * Converts a string to PascalCase.
     *
     * @param {string} str - The input string.
     * @returns {string}
     */
    const toPascalCase = (str) => {
        return str
            .replace(/[^\w\s]|_+/g, " ")
            .replace(/\s+/g, " ")
            .trim()
            .replace(/(?:^|\W|_)\w/g, (match) => match.toUpperCase())
            .replace(/[\s]+/g, "");
    };

    /**
     * Converts a string to camelCase.
     *
     * @param {string} str - The input string.
     * @returns {string}
     */
    const toCamelCase = (str) => {
        const pascalCase = toPascalCase(str);
        return pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1);
    };

    const formatString = () => {
        const caseSelector = document.getElementById("case-select").value;
        let formattedString = stringToFormatInput.value;

        if (!formattedString) return;

        switch (caseSelector) {
            case "snakeCase":
                formattedString = toSnakeCase(formattedString);
                break;
            case "kebabCase":
                formattedString = toKebabCase(formattedString);
                break;
            case "camelCase":
                formattedString = toCamelCase(formattedString);
                break;
            case "pascalCase":
                formattedString = toPascalCase(formattedString);
                break;
            default:
                console.error(`Unexpected case value: ${caseSelector}`);
                break;
        }

        stringToFormatInput.value = formattedString;
        stringToFormatInput.select();
        navigator.clipboard
            .writeText(formattedString)
            .catch((err) =>
                console.error("Unable to copy text to clipboard", err)
            );
    };

    searchButton.addEventListener("click", formatString);

    stringToFormatInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") formatString();
    });

    window.addEventListener("keyup", handleSecretCodeCheck);
    window.addEventListener("load", () => stringToFormatInput.focus());
})();
