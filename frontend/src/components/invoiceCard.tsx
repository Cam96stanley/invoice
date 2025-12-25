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
          <div key={invoice.id} className="invoice-card">
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
