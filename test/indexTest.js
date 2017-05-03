"use strict";

const expect = require("chai").expect;
const fs = require("fs");
const nock = require("nock");
const vo = require("vo");

const numSearchResults = require("../index");
const bingJavascript = fs.readFileSync("./test/data/bing-javascript.html", "utf8");
const bingJibberish = fs.readFileSync("./test/data/bing-fdvdghgfhfghfghfghfd.html", "utf8");

describe("number of search results", () => {
  it("should return found links for query from Bing", (done) => {
    const query = "javascript";

    nock("https://www.bing.com")
      .get(`/search?q=${encodeURIComponent(query)}`)
      .reply(200, bingJavascript);

    const search = vo(numSearchResults.bing(query));
    vo(search)
      .then((response) => {
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

    const search = vo(numSearchResults.bing(query));
    vo(search)
      .then((response) => {
        expect(response).to.exist;
        expect(response).to.equal(0);

        done();
      });
  });
});
