"use strict";

const expect = require("chai").expect;

const resultParser = require("../../lib/resultParser");

describe("result parser", () => {
  it("should parse correct number of results with large number", () => {
    const results = resultParser("About 1&nbsp;980&nbsp;000&nbsp;000 results<nobr> (0,50 seconds)&nbsp;</nobr>");
    expect(results).to.be.equal(1980000000);
  });

  it("should parse correct number of results with large number", () => {
    const results = resultParser("32&#xA0;300&#xA0;000 resultat");
    expect(results).to.be.equal(32300000);
  });

  it("should parse correct number of results with large number", () => {
    const results = resultParser("About 37&#xFFFD;300&#xFFFD;000 results");
    expect(results).to.be.equal(37300000);
  });

  it("should parse correct number of results with few results", () => {
    const results = resultParser("9 results<nobr> (0,56 seconds)&nbsp;</nobr>");
    expect(results).to.be.equal(9);
  });

  it("should parse correct number of results with no results", () => {
    const results = resultParser("");
    expect(results).to.be.equal(0);
  });
});
