const tsPresets = require("ts-jest/jest-preset");
const shelfPresets = require("@shelf/jest-mongodb/jest-preset");

module.exports = {
  ...tsPresets,
  ...shelfPresets,
};
