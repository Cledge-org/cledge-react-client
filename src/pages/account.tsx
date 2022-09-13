import AccountPage from "../main-pages/AccountPage/AccountPage";
const Account = () => {
  return <AccountPage />;
};
Account.requireAuth = true;
export default Account;
