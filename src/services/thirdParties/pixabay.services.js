/* eslint-disable no-console */
const axios = require("axios").default;
const config = require("../../config/config");

const PIXABAY_URL = "https://pixabay.com/api/";

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
      baseURL: PIXABAY_URL,
      params: {
        key: config.thirdPartiesKeys.pixabay,
        id: imageID,
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

module.exports = {
  searchImage,
  getImage,
};
