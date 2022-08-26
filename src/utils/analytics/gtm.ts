import TagManager from "react-gtm-module";

const env = process.env.NODE_ENV;

const tagManagerArgs = {
    gtmId: "W2QHN43",
    auth: env === "development"
        ? "tdHPW-VrPR4tEMTZJHZJWw" //dev ga_auth
        : "LqCkmESS1IkHOPjzAq_B0Q", //live ga_auth
    preview: env === "development"
        ? "env-3" //dev ga_env
        : "env-1" //live ga_env
};

export const initializeTagManager = () => {
    TagManager.initialize(tagManagerArgs);
};
