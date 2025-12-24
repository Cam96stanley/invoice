import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LoginPage />} />
        <Route />
      </Route>
    </Routes>
  );
}

export default App;
