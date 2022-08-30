import  TagManager  from 'react-gtm-module';

const env = process.env.NODE_ENV;

const tagManagerArgs = {
    gtmId: "GTM-W2QHN43"
}

export const initializeTagManager = () => {
    TagManager.initialize(tagManagerArgs);
}