import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main className='container my-4'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
