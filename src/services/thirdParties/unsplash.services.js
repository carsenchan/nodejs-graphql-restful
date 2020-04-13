/* eslint-disable no-console */
const axios = require("axios").default;
const config = require("../../config/config");

const UNSPLASH_DOMAIN = "https://api.unsplash.com";
const IMAGE_SOURCE = "Unsplash";

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
        const { results } = res.data;
        if (results && results.length > 0) {
          console.log(results[0]);
          const returnImages = results.map((current) => {
            const tagsRaw = current.tags;
            const tags = (tagsRaw && tagsRaw.map((tag) => tag.title)) || [];
            return {
              image_ID: current.id,
              thumbnails: current.urls.thumb,
              preview: current.urls.regular,
              title: current.alt_description,
              tags,
              source: IMAGE_SOURCE,
            };
          });
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
