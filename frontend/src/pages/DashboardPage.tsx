import { useEffect, useState } from "react";
import axios from "axios";
import FilterDropdown from "../components/filterDropdown";
import "./dashboard.css";
import plusSign from "../assets/icon-plus.svg";
import illustrationEmpty from "../assets/illustration-empty.svg";
import InvoiceCard from "../components/invoiceCard";

export default function DashboardPage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const filterOptions = ["Paid", "Pending", "Draft"];

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axios.get("http://localhost:5000/invoices/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setInvoices(res.data.data);
      } catch (err) {
        console.error(err);
        setError("Could not load invoices");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard--header">
        <div className="dashboard--status">
          <h1 className="dashboard--heading">Invoices</h1>
          <p>{`${invoices.length} invoices`}</p>
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
      {invoices.length === 0 ? (
        <div className="empty-image-container">
          <img
            src={illustrationEmpty}
            alt="An envelope with a woman coming out of it wearing a purple blazer speaking into a megaphone"
            className="empty-image"
          />
          <div className="cta">
            <p className="cta-header">There is nothing here</p>
            <p className="cta-body">
              Create an invoice by clicking the <b>New</b> button and get
              started.
            </p>
          </div>
        </div>
      ) : (
        <InvoiceCard invoices={invoices} />
      )}
    </div>
  );
}
