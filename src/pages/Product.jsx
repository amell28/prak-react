import { GrAdd } from "react-icons/gr";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import dataProducts from "../data/Product.json";

export default function Product() {
  return (
    <div id="dashboard-container">
      <PageHeader title="Products" />

      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Daftar Produk</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Tittle</th>
                <th className="py-2 px-4">Code</th>
                <th className="py-2 px-4">Category</th>
                <th className="py-2 px-4">Brand</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Stock</th>
              </tr>
            </thead>
            <tbody>
              {dataProducts.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="py-2 px-4">{product.id}</td>
                  <td className="py-2 px-4">
                    <Link
                      to={`/products/${product.id}`}
                      className="text-emerald-400 hover:text-emerald-500"
                    >
                      {product.tittle}
                    </Link>
                  </td>
                  <td className="py-2 px-4">{product.code}</td>
                  <td className="py-2 px-4">{product.category}</td>
                  <td className="py-2 px-4">{product.brand}</td>
                  <td className="py-2 px-4">Rp {product.price.toLocaleString("id-ID")}</td>
                  <td className="py-2 px-4">{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
