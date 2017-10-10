"use strict";

function resultParser(text) {
    if (!text) return 0;
    var parts = text.split(" ");
    for(var part of parts) {
        part = part.split('.').join('');
        if(!isNaN(part)) {
            return parseInt(part);
        }
    }
    return 0;
}

module.exports = resultParser;
