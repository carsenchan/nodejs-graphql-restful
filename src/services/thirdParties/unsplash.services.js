/* eslint-disable no-console */
const axios = require("axios").default;
const config = require("../../config/config");

const UNSPLASH_DOMAIN = "https://api.unsplash.com";

const searchImage = (keyword) => {
  const returnPromise = new Promise((resolve, reject) => {
    axios({
      method: "GET",
      baseURL: UNSPLASH_DOMAIN,
      url: "/search/photos",
      headers: {
        Authorization: `Client-ID ${config.thirdPartiesKeys.unsplash}`,
      },
      params: {
        query: keyword,
        per_page: 20,
      },
    })
      .then((res) => {
        console.log(res.data);
        console.log(res.status);
        console.log(res.statusText);
        console.log(res.headers);
        resolve(res.data);
      })
      .catch((error) => reject(error));
  });
  return returnPromise;
};

const getImage = (imageID) => {
  const returnPromise = new Promise((resolve, reject) => {
    axios({
      method: "GET",
      baseURL: UNSPLASH_DOMAIN,
      url: `/photos/${imageID}`,
      headers: { Authorization: config.thirdPartiesKeys.unsplash },
    })
      .then((res) => {
        console.log(res.data);
        console.log(res.status);
        console.log(res.statusText);
        console.log(res.headers);
        resolve(res.data);
      })
      .catch((error) => reject(error));
  });
  return returnPromise;
};

module.exports = { searchImage, getImage };
