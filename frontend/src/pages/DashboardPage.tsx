import FilterDropdown from "../components/filterDropdown";
import "./dashboard.css";
import plusSign from "../assets/icon-plus.svg";

export default function DashboardPage() {
  const filterOptions = ["Paid", "Pending", "Draft"];

  return (
    <div className="dashboard">
      <div className="dashboard--header">
        <div className="dashboard--status">
          <h1 className="dashboard--heading">Invoices</h1>
          <p>{"No invoices"}</p>
        </div>
        <div className="dashboard--actions">
          <FilterDropdown options={filterOptions} />
          <button className="new--button">
            <div className="plus--bg">
              <img src={plusSign} alt="Plus sign" />
            </div>
            New
          </button>
        </div>
      </div>
    </div>
  );
}
