"use strict";

function resultParser(text) {
  if (!text) return 0;

  let regex = new RegExp("&nbsp;", "g");
  text = text.replace(regex, "");

  regex = new RegExp("&#xA0;", "g");
  text = text.replace(regex, "");

  regex = /\s?\d*\s/;
  const match = regex.exec(text);

  return +match[0].trim();
}

module.exports = resultParser;
