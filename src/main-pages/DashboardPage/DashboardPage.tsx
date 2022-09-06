import { connect } from "react-redux";

const DashboardPage = ({ accountInfo }: { accountInfo: AccountInfo }) => {
  return (
    <div
      className="d-flex flex-column w-100 h-100"
      style={{ backgroundColor: "#F9FAFF" }}
    >
      <div>Hi, {accountInfo.name}. Welcome to the dashboard</div>
      <div>
        <div>The essential resources for UW CS applications</div>
        <div></div>
      </div>
      <div>
        <div>Cledge's powerful features to assist you</div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
export default connect((state) => {
  return {
    accountInfo: state.accountInfo,
  };
})(DashboardPage);
