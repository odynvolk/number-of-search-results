"use strict";

const expect = require("chai").expect;
const fs = require("fs");
const nock = require("nock");

const numSearchResults = require("../index");

const bingJavascript = fs.readFileSync("./test/data/bing-javascript.html", "utf8");
const bingJibberish = fs.readFileSync("./test/data/bing-fdvdghgfhfghfghfghfd.html", "utf8");

const googleJavascript = fs.readFileSync("./test/data/google-javascript.html", "utf8");
const googleJibberish = fs.readFileSync("./test/data/google-fdvdghgfhfghfghfghfd.html", "utf8");

const spanishGoogleJavascript = fs.readFileSync("./test/data/spanish-google-javascript.html", "utf8");

describe("number of search results", () => {
  describe("Bing", () => {
    it("should return found links for query from Bing", (done) => {
      const query = "javascript";

      nock("https://www.bing.com")
        .get(`/search?q=${encodeURIComponent(query)}`)
        .reply(200, bingJavascript);

      numSearchResults.bing(query).then((response) => {
          expect(response).to.exist;
          expect(response).to.be.above(30000000);

          done();
        });
    });

    it("should return no found links for query from Bing", (done) => {
      const query = "fdvdghgfhfghfghfghfd";

      nock("https://www.bing.com")
        .get(`/search?q=${encodeURIComponent(query)}`)
        .reply(200, bingJibberish);

      numSearchResults.bing(query).then((response) => {
          expect(response).to.exist;
          expect(response).to.equal(0);

          done();
        });
    });
  });

  describe("Google", () => {
    it("should return found links for query from Google", (done) => {
      const query = "javascript";

      nock("https://www.google.com")
        .get(`/search?q=${encodeURIComponent(query)}`)
        .reply(200, googleJavascript);

      numSearchResults.google(query).then((response) => {
          expect(response).to.exist;
          expect(response).to.be.above(1900000000);

          done();
        });
    });

    it("should return found links for query from spanish Google", (done) => {
      const query = "javascript";

      nock("https://www.google.com")
        .get(`/search?q=${encodeURIComponent(query)}`)
        .reply(200, spanishGoogleJavascript);

      numSearchResults.google(query).then((response) => {
          expect(response).to.exist;
          expect(response).to.be.above(1000000);

          done();
        });
    });

    it("should return no found links for query from Google", (done) => {
      const query = "fdvdghgfhfghfghfghfd";

      nock("https://www.google.com")
        .get(`/search?q=${encodeURIComponent(query)}`)
        .reply(200, googleJibberish);

      numSearchResults.google(query).then((response) => {
          expect(response).to.exist;
          expect(response).to.equal(0);

          done();
        });
    });
  });
});
