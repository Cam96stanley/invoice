import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./invoiceCard.css";

interface Item {
  name: string;
  quantity: number;
  price: number;
}

interface Invoice {
  id: string;
  displayInvoiceNumber: string;
  fromEmail: string;
  fromName: string;
  fromStreet: string;
  fromCity: string;
  fromState: string;
  formZip: string;
  toEmail: string;
  toName: string;
  toStreet: string;
  toCity: string;
  toState: string;
  toZip: string;
  description: string;
  total: number;
  status: string;
  items: Item[];
  dueDate: string;
  updatedAt: string;
  createdAt: string;
}

interface InvoiceProps {
  invoices: Invoice[];
}

export default function InvoiceCard({ invoices }: InvoiceProps) {
  const navigate = useNavigate();

  const handleCardClick = async (invoiceId: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/invoices/${invoiceId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(res.data.data);
      navigate(`/invoices/${invoiceId}`, { state: { invoice: res.data.data } });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data?.error);
      } else if (err instanceof Error) {
        console.error("Unexpected error:", err.message);
      }
      console.error("Unknown error:", err);
    }
  };

  return (
    <div className="invoice-container">
      {invoices.map((invoice) => {
        const dueDate = new Date(invoice.dueDate);
        const formattedDueDate = `Due ${dueDate.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}`;

        return (
          <div
            key={invoice.id}
            className="invoice-card"
            onClick={() => handleCardClick(invoice.id)}
            style={{ cursor: "pointer" }}
          >
            <div className="left-card">
              <p className="invoice-number">{invoice.displayInvoiceNumber}</p>
              <p className="due-date">{formattedDueDate}</p>
              <p className="total">{`$${invoice.total}`}</p>
            </div>
            <div className="right-card">
              <p className="to-name">{invoice.toName}</p>
              <div>
                <p className="status">{invoice.status}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
