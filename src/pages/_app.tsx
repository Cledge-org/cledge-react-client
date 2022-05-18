import "bootstrap/dist/css/bootstrap.css";
import "src/common/styles/global-styles.scss";
import "src/common/styles/palette.scss";
import "src/common/styles/typography.scss";
import "antd/dist/antd.css";
import "src/main-pages/AccountPage/account-page.scss";
import "src/main-pages/ResourcesPage/resources-page.scss";
import "src/main-pages/PathwayPage/pathway-page.scss";
import "src/main-pages/MetricsPage/metrics-page.scss";
import "src/main-pages/WelcomePage/welcome-page.scss";
import "src/main-pages/AuthPages/SignupPage/signup-page.scss";
import "src/main-pages/AuthPages/SignoutPage/signout-page.scss";
import "src/main-pages/AuthPages/ResetPasswordPage/reset-password-page.scss";
import "src/main-pages/AuthPages/LoginPage/login-page.scss";
import MyAppPage from "../main-pages/AppPage/AppPage";

const MyApp = ({ Component, pageProps }) => {
  return <MyAppPage Component={Component} pageProps={pageProps} />;
};
export default MyApp;
