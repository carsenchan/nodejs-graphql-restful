const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");

const ImageType = new GraphQLObjectType({
  name: "Image",
  description: "Scene image source",
  fields: () => ({
    image_ID: {
      type: GraphQLString,
      resolve: (image) => image.image_ID,
    },
    thumbnails: {
      type: GraphQLString,
      resolve: (image) => image.image_ID,
    },
    preview: {
      type: GraphQLString,
      resolve: (image) => image.preview,
    },
    title: {
      type: GraphQLString,
      resolve: (image) => image.title,
    },
    source: {
      type: GraphQLString,
      resolve: (image) => image.source,
    },
    tags: {
      type: new GraphQLList(GraphQLString),
      resolve: (image) => image.tags,
    },
  }),
});

module.exports = ImageType;
