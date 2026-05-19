import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";

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
    </div>
  );
}
