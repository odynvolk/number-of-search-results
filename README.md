# number-of-search-results
> Small module for retrieving number of search results for a given query from different search engines. It doesn't scrape the actual links.
 
## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm install number-of-search-results --save
```

## Usage

```js

const numSearchResults = require("number-of-search-results");

const query = "javascript";  
const bing = numSearchResults.bing(query).then((numResults) => {
  //=> 190000000
});

const google = numSearchResults.google(query).then((numResults) => {
  //=> 200000000
});

````

## Running tests

Install dev dependencies:

```sh
$ npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/odynvolk/number-of-search-results/issues/new)

## Author

+ [github/odynvolk](https://github.com/odynvolk)

## License

Released under the MIT license.
