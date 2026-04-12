const output = document.getElementById("event-output");
const prompt = document.querySelector(".terminal-prompt");

// Wraps text in a coloured <span> for syntax highlighting
const span = (cls, text) => `<span class="${cls}">${text}</span>`;

const renderEvent = (e) => {
    const key = e.key === " " ? "Space" : e.key;

    // Green for active modifiers, greyed out for inactive
    const bool = (val) =>
        val
            ? span("token-boolean-true", "true")
            : span("token-boolean-false", "false");

    // padEnd(8) keeps all values column-aligned regardless of key name length
    const row = (k, v) =>
        `  ${span("token-key", k.padEnd(8))}${span("token-string", `"${v}"`)}`;

    prompt.textContent = "// KeyboardEvent";

    output.innerHTML =
        span("token-keyword", "const") +
        " event = " +
        span("token-brace", "{") +
        "\n" +
        row("key:", key) +
        "\n" +
        row("code:", e.code) +
        "\n" +
        `  ${span("token-key", "shift:  ")}${bool(e.shiftKey)}\n` +
        `  ${span("token-key", "ctrl:   ")}${bool(e.ctrlKey)}\n` +
        `  ${span("token-key", "alt:    ")}${bool(e.altKey)}\n` +
        `  ${span("token-key", "meta:   ")}${bool(e.metaKey)}\n` +
        span("token-brace", "}") +
        span("token-keyword", ";");
};

document.addEventListener("keydown", renderEvent);
