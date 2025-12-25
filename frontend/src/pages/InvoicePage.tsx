import { useParams } from "react-router-dom";

export default function InvoicePage() {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <div>
        <p>Invoice ${id}</p>
      </div>
    </>
  );
}
