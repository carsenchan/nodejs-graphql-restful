const { GraphQLString, GraphQLList } = require("graphql");

const { ImageType } = require("../types");

const ImageServices = require("../../services/thirdParties");

const searchImages = {
  type: new GraphQLList(ImageType),
  description: "The mutation for searching imagse",
  args: {
    keyword: {
      name: "keyword",
      type: GraphQLString,
    },
  },
  resolve: (value, { keyword }) => {
    const pixaBayPromise = ImageServices.pixabayServices.searchImage(keyword);
    const storyBlocksPromise = ImageServices.storyBlocksServices.searchImage(
      keyword
    );
    const unsplashPromise = ImageServices.unsplashServices.searchImage(keyword);
    const searchesTasks = [pixaBayPromise, storyBlocksPromise, unsplashPromise];
    const results = Promise.all(searchesTasks).then((responses) => {
      return [...responses[0], ...responses[1], ...responses[2]];
    });
    return results;
  },
};

module.exports = { searchImages };
