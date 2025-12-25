import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import ConfirmSignupPage from "./pages/ConfirmSignupPage";
import InvoicePage from "./pages/InvoicePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/confirmSignup" element={<ConfirmSignupPage />} />
        <Route path="/invoices/:id" element={<InvoicePage />} />
      </Route>
    </Routes>
  );
}

export default App;
