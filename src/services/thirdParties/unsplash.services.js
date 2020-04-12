const Unsplash = require("unsplash-js").default;
const { toJson } = require("unsplash-js");
const config = require("../../config/config");

const unsplash = new Unsplash({
  accessKey: config.thirdPartiesKeys.unsplash,
  // Optionally you can also configure a custom header to be sent with every request
  headers: {
    "X-Custom-Header": "foo",
  },
  // Optionally if using a node-fetch polyfill or a version of fetch which supports the timeout option, you can configure the request timeout for all requests
  timeout: 500, // values set in ms
});

const searchImage = (keyword, page, perPage) => {
  return unsplash.search.photos(keyword, page, perPage).then(toJson);
};

module.exports.search = searchImage;
