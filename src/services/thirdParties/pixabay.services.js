/* eslint-disable no-console */
const axios = require("axios").default;
const config = require("../../config/config");

const PIXABAY_URL = "https://pixabay.com/api/";
const IMAGE_SOURCE = "Pixabay";

const searchImage = (keyword) => {
  const returnPromise = new Promise((resolve, reject) => {
    axios({
      method: "GET",
      baseURL: PIXABAY_URL,

      params: {
        key: config.thirdPartiesKeys.pixabay,
        q: keyword.toLowerCase().replace(" ", "+"),
        per_page: 20,
      },
    })
      .then((res) => {
        const { hits } = res.data;
        if (hits && hits.length > 0) {
          const imageList = hits.map((current) => ({
            image_ID: `${current.id}`,
            thumbnails: current.webformatURL,
            preview: current.previewURL,
            title: current.title || "",
            tags: current.tags.split(",").map((tag) => tag.trim()),
            source: IMAGE_SOURCE,
          }));
          resolve(imageList);
        } else {
          resolve([]);
        }
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
      baseURL: PIXABAY_URL,
      params: {
        key: config.thirdPartiesKeys.pixabay,
        id: imageID,
      },
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => reject(error));
  });
  return returnPromise;
};

module.exports = {
  searchImage,
  getImage,
};
