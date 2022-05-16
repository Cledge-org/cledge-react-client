import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.scss";
import "../styles/question_pages.scss";
import "../styles/main_pages.scss";
import "../styles/components.scss";
import "../styles/question_components.scss";
import "../styles/testing.css";
import "antd/dist/antd.css";
import MyAppPage from "../MainPages/AppPage/AppPage";
const MyApp = ({ Component, pageProps }) => {
  return <MyAppPage Component={Component} pageProps={pageProps} />;
};
export default MyApp;
