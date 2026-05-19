import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import Container from "../components/Container";
import Footer from "../components/Footer";

export default function Components() {
  return (
    <div id="dashboard-container">
      <PageHeader title="Components" breadcrumb={["Dashboard", "Components"]} />

      <div class="flex gap-2 mt-4">
        <Badge type="primary">Edit</Badge>
        <Badge type="success">Simpan</Badge>
        <Badge type="danger">Hapus</Badge>
      </div>

      <div class="flex gap-2 mt-4">
        <Avatar name="Budi" />
        <Avatar name="Siti" />
      </div>

      <Container className="bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Daftar Produk</h1>

        <p className="text-gray-600">Berikut adalah daftar produk terbaru.</p>
      </Container>

      <Footer/>

    </div>
  );
}
