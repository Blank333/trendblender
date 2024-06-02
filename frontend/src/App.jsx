import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
  // Paypal
  const initialOptions = {
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT,
    currency: "USD",
    intent: "capture",
  };
  return (
    <>
      <Header />
      <main className='container my-4'>
        <PayPalScriptProvider options={initialOptions}>
          <Outlet />
        </PayPalScriptProvider>
      </main>
      <Footer />
    </>
  );
}

export default App;
