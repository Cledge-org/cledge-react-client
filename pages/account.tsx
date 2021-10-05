import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// my accounts page
export default function Account() {
  return (
    <div className="container-fluid h-100 center-child">
      <div style={{ width: "40%" }}>
        <span
          className="cl-dark-text fw-bold pb-4"
          style={{ fontSize: "1.7em" }}
        >
          Personal Info
        </span>
        <div className="myaccount-blob">
          <span className="title">Basic Info</span>
          <InfoSection name="NAME" value="John Cena" onEdit={() => {}} />
          <InfoSection name="NAME" value="John Cena" onEdit={() => {}} />
          <InfoSection name="NAME" value="John Cena" onEdit={() => {}} />
          <InfoSection name="NAME" value="John Cena" onEdit={() => {}} />
        </div>
        <div className="myaccount-blob">
          <span className="title">Contact Info</span>
          <InfoSection name="NAME" value="John Cena" onEdit={() => {}} />
          <InfoSection name="NAME" value="John Cena" onEdit={() => {}} />
        </div>
        <div className="myaccount-blob">
          <span className="title">Academic Info</span>
          <InfoSection name="NAME" value="John Cena" onEdit={() => {}} />
        </div>
      </div>
    </div>
  );
}
interface InfoSectionProps {
  name: string;
  value: any;
  onEdit: Function;
}
function InfoSection({ name, value, onEdit }: InfoSectionProps) {
  return (
    <div className="myaccount-info-section">
      <span className="name">{name.toUpperCase()}</span>
      <div className="info-container">
        {value}
        <button className="icon-btn" onClick={() => onEdit()}>
          <FontAwesomeIcon icon={faPencilAlt} style={{ width: "20px" }} />
        </button>
      </div>
    </div>
  );
}
Account.requireAuth = false;
