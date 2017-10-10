"use strict";

function resultParser(text) {
    if (!text) return 0;
    const parts = text.split(" ");
    for (let part of parts) {
        part = part.split(".").join("");
        if (!isNaN(part)) {
            return parseInt(part);
        }
    }
    return 0;
}

module.exports = resultParser;
