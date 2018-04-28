"use strict";

const _ = require("lodash");
const cheerio = require("cheerio");
const rp = require("request-promise");
const sanitizeHtml = require("sanitize-html");

const resultParser = require("./lib/resultParser");

const numSearchResults = {};

numSearchResults.bing = function (query, proxy) {
  const opts = {
    url: `https://www.bing.com/search?q=${encodeURIComponent(query)}`,
    headers: {
      "User-Agent": randomUserAgent(),
      "accept-language": "en-US,en;q=0.9,sv;q=0.8,ru;q=0.7,fr;q=0.6,de;q=0.5,ja;q=0.4,zh-CN;q=0.3,zh;q=0.2,pl;q=0.1,it;q=0.1,da;q=0.1",
      "referer": "https://www.bing.com/"
    }
  };
  if (proxy) opts.proxy = proxy;

  return rp.get(opts)
    .then((data) => {
      const $ = cheerio.load(sanitizeHtml(data, {
        allowedTags: false,
        allowedAttributes: false
      }));

      const numberOfResults = resultParser($(".sb_count").html());

      return numberOfResults;
    });
};

numSearchResults.google = function (query, proxy) {
  const opts = {
    url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
    headers: {
      "User-Agent": randomUserAgent(),
      "accept-language": "en-US,en;q=0.9,sv;q=0.8,ru;q=0.7,fr;q=0.6,de;q=0.5,ja;q=0.4,zh-CN;q=0.3,zh;q=0.2,pl;q=0.1,it;q=0.1,da;q=0.1",
      "referer": "https://www.google.com/"
    }
  };
  if (proxy) opts.proxy = proxy;

  return rp.get(opts)
    .then((data) => {
      const $ = cheerio.load(sanitizeHtml(data, {
        allowedTags: false,
        allowedAttributes: false
      }));

      const numberOfResults = resultParser($("#resultStats").html());

      return numberOfResults;
    });
};

function randomUserAgent() {
  return _.random([
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_1) AppleWebKit/534.48.3 (KHTML, like Gecko) Version/5.1 Safari/534.48.3",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
    "Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.202 Safari/535.1",
    "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.2.17) Gecko/20110420 Firefox/3.6.17",
    "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media",
    "Opera/9.80 (X11; Linux i686; U; en) Presto/2.9.168 Version/11.50",
    "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)",
    "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.116 Safari/537.36",
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:27.0) Gecko/20100101 Firefox/27.0",
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:48.0) Gecko/20100101 Firefox/48.0"
  ]);
}

module.exports = numSearchResults;
