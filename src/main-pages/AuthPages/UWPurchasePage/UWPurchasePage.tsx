import PurchasePageInput from "src/main-pages/AuthPages/UWPurchasePage/components/PurchasePageInput/PurchasePageInput";

const UWPurchasePage = () => {
  return (
    <div className="w-100 vh-100" style={{ backgroundColor: "#F9FAFF" }}>
      <div>
        <div>
          <div>Create an account</div>
        </div>
        <div>
          <div>Payment method</div>
          <div>
            <PurchasePageInput
              heading={""}
              placeholder={""}
              onChange={(value: string) => {}}
            />
            <PurchasePageInput
              heading={""}
              placeholder={""}
              onChange={(value: string) => {}}
            />
          </div>
          <input />
          <div>
            <PurchasePageInput
              heading={""}
              placeholder={""}
              onChange={(value: string) => {}}
            />
            <PurchasePageInput
              heading={""}
              placeholder={""}
              onChange={(value: string) => {}}
            />
          </div>
          <div>Images HERE</div>
        </div>
        <div>
          <div>Billing address</div>
          <div>
            <PurchasePageInput
              heading={""}
              placeholder={""}
              onChange={(value: string) => {}}
            />
            <PurchasePageInput
              heading={""}
              placeholder={""}
              onChange={(value: string) => {}}
            />
          </div>
          <PurchasePageInput
            heading={""}
            placeholder={""}
            onChange={(value: string) => {}}
          />
          <PurchasePageInput
            heading={""}
            placeholder={""}
            onChange={(value: string) => {}}
          />
          <PurchasePageInput
            heading={""}
            placeholder={""}
            onChange={(value: string) => {}}
          />
          <PurchasePageInput
            heading={""}
            placeholder={""}
            onChange={(value: string) => {}}
          />
          <PurchasePageInput
            heading={""}
            placeholder={""}
            onChange={(value: string) => {}}
          />
          <PurchasePageInput
            heading={""}
            placeholder={""}
            onChange={(value: string) => {}}
          />
        </div>
      </div>
      <div>
        <div></div>
      </div>
    </div>
  );
};
export default UWPurchasePage;
