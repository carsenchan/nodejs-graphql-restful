const httpStatus = require("http-status");
const unsplashServices = require("../services/thirdParties/unsplash.services");
const pixabayServices = require("../services/thirdParties/pixabay.services");
const storyBlocksServices = require("../services/thirdParties/storyblock.services");
const AppError = require("../utilis/appError");

const searchImages = async (keyword) => {
  try {
    const promises = [
      unsplashServices.searchImage(keyword),
      pixabayServices.searchImage(keyword),
      storyBlocksServices.searchImage(keyword),
    ];
    const responses = await Promise.all(promises);
    const results = [...responses[0], ...responses[1], ...responses[2]];

    return results;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Third party issue");
  }
};

module.exports = {
  searchImages,
};
