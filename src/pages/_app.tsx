import "node_modules/bootstrap/dist/css/bootstrap.css";
import "src/common/styles/global-styles.scss";
import "antd/dist/antd.css";
import MyAppPage from "../main-pages/AppPage/AppPage";

const MyApp = ({ Component, pageProps }) => {
  return <MyAppPage Component={Component} pageProps={pageProps} />;
};
export default MyApp;
