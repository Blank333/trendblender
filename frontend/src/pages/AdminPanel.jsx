import { Outlet } from "react-router-dom";
import AdminSidePanel from "../components/AdminSidePanel";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Container } from "react-bootstrap";

function AdminPanel() {
  return (
    <>
      <Header />
      <main className='my-4'>
        <AdminSidePanel />
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default AdminPanel;
