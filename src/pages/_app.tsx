import "bootstrap/dist/css/bootstrap.css";
import "../common/styles/globals.scss";
import "../common/styles/question_pages.scss";
import "../common/styles/main_pages.scss";
import "../common/styles/components.scss";
import "../common/styles/question_components.scss";
import "antd/dist/antd.css";

import MyAppPage from "../main-pages/AppPage/AppPage";
const MyApp = ({ Component, pageProps }) => {
  return <MyAppPage Component={Component} pageProps={pageProps} />;
};
export default MyApp;
