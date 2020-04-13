/* eslint-disable no-console */
const axios = require("axios").default;
const crypto = require("crypto");
const config = require("../../config/config");

const STORYBLOCK_BASE_URL = "https://api.graphicstock.com";
const SEARCH_URL = "/api/v1/stock-items/search/";
const IMAGE_SOURCE = "StoryBlocks";

const expires = () => Math.floor(Date.now() / 1000);

const generateHmac = (urlApplied) => {
  const hmacBuilder = crypto.createHmac(
    "sha256",
    config.thirdPartiesKeys.storyBlocks.privateKey + expires()
  );
  hmacBuilder.update(urlApplied);
  const hmac = hmacBuilder.digest("hex");
  return hmac;
};

const searchImage = (keyword) => {
  const returnPromise = new Promise((resolve, reject) => {
    axios({
      method: "GET",
      baseURL: STORYBLOCK_BASE_URL,
      url: SEARCH_URL,
      params: {
        keywords: keyword,
        page: 1,
        num_results: 20,
        APIKEY: config.thirdPartiesKeys.storyBlocks.publicKey,
        EXPIRES: expires(),
        HMAC: generateHmac(SEARCH_URL),
      },
    })
      .then((res) => {
        const responseBody = res.data;
        if (responseBody.info && responseBody.info.length > 0) {
          const imageList = responseBody.info;
          const returnImages = imageList.map((current) => ({
            image_ID: current.id,
            thumbnails: current.thumbnail_url,
            preview: current.preview_url,
            title: current.title,
            tags: current.keywords,
            source: IMAGE_SOURCE,
          }));
          resolve(returnImages);
        } else {
          resolve([]);
        }
      })
      .catch((error) => reject(error));
  });
  return returnPromise;
};

const getImage = (imageID) => {
  const returnPromise = new Promise((resolve, reject) => {
    const url = `/api/v1/stock-items/${imageID}`;
    axios({
      method: "GET",
      baseURL: STORYBLOCK_BASE_URL,
      url,
      params: {
        APIKEY: config.thirdPartiesKeys.storyBlocks.publicKey,
        EXPIRES: expires(),
        HMAC: generateHmac(url),
      },
    })
      .then((res) => {
        const responseBody = res.data;
        if (responseBody.info && responseBody.info.length > 0) {
          const imageList = responseBody.info;
          const returnImages = imageList.map((current) => ({
            image_ID: current.id,
            thumbnails: current.thumbnail_url,
            preview: current.preview_url,
            title: current.title,
            source: IMAGE_SOURCE,
          }));
          console.log(returnImages);
          resolve(returnImages);
        } else {
          resolve([]);
        }
      })
      .catch((error) => reject(error));
  });
  return returnPromise;
};

module.exports = {
  searchImage,
  getImage,
};
