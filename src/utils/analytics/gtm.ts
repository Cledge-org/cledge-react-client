import TagManager from "react-gtm-module";
import { getEnvVariable } from "src/config/getConfig";

const env = getEnvVariable("NODE_ENV");

const tagManagerArgs = {
  gtmId: "GTM-W2QHN43",
};

export const initializeTagManager = () => {
  TagManager.initialize(tagManagerArgs);
};
