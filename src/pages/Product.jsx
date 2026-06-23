import { GrAdd } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { supabase } from "../service/supabaseClient";

export default function Product({ profile }) {
  const [dataProducts, setDataProducts] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [quantities, setQuantities] = useState({})
  const [dataForm, setDataForm] = useState({
    name: "",
    price: "",
    stock: "",
  })

  const isAdmin = profile?.role === "admin"

  const loadProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })

    setDataProducts(data || [])
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleChange = (evt) => {
    const { name, value } = evt.target
    setDataForm({
      ...dataForm,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isAdmin) return

    const payload = {
      name: dataForm.name,
      price: Number(dataForm.price),
      stock: Number(dataForm.stock),
    }

    if (editingId) {
      await supabase.from("products").update(payload).eq("id", editingId)
    } else {
      await supabase.from("products").insert(payload)
    }

    setDataForm({ name: "", price: "", stock: "" })
    setEditingId(null)
    loadProducts()
  }

  const handleEdit = (product) => {
    if (!isAdmin) return
    setEditingId(product.id)
    setDataForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
    })
  }

  const handleDelete = async (id) => {
    if (!isAdmin) return
    const konfirmasi = window.confirm("Yakin ingin menghapus produk ini?")
    if (!konfirmasi) return

    await supabase.from("products").delete().eq("id", id)
    loadProducts()
  }

  const handleQuantityChange = (productId, value) => {
    setQuantities({
      ...quantities,
      [productId]: value,
    })
  }

  const handleOrder = async (product) => {
    setMessage("")
    setError("")

    if (profile?.role !== "member") {
      setError("Hanya akun member yang bisa membuat pesanan")
      return
    }

    const quantity = Number(quantities[product.id] || 1)
    const { error: orderError } = await supabase.rpc("create_member_order", {
      product_id: product.id,
      quantity,
    })

    if (orderError) {
      setError(orderError.message)
      return
    }

    setMessage(`Pesanan ${product.name} berhasil dibuat`)
    setQuantities({ ...quantities, [product.id]: 1 })
    loadProducts()
  }

  return (
    <div id="dashboard-container" >
      <PageHeader title={isAdmin ? "Products" : "Order Product"} breadcrumb={["Dashboard","Product"]}/>

      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">{isAdmin ? "Daftar Produk" : "Pilih Produk"}</h1>
        {message ? <div className="mb-4 rounded-lg bg-green-100 px-4 py-3 text-green-700">{message}</div> : null}
        {error ? <div className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-red-700">{error}</div> : null}
        {isAdmin ? (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4 mb-4 grid md:grid-cols-4 gap-3">
          <input
            type="text"
            name="name"
            value={dataForm.name}
            onChange={handleChange}
            placeholder="Nama Produk"
            className="border border-gray-200 rounded-lg px-3 py-2"
            required
          />
          <input
            type="number"
            name="price"
            value={dataForm.price}
            onChange={handleChange}
            placeholder="Harga"
            className="border border-gray-200 rounded-lg px-3 py-2"
            required
          />
          <input
            type="number"
            name="stock"
            value={dataForm.stock}
            onChange={handleChange}
            placeholder="Stok"
            className="border border-gray-200 rounded-lg px-3 py-2"
            required
          />
          <button className="bg-[#00B074] text-white px-5 py-2 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#009663] transition-all">
            <GrAdd className="text-xl" />
            <span>{editingId ? "Update Produk" : "Add Produk"}</span>
          </button>
        </form>
        ) : null}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Stock</th>
                <th className="py-2 px-4">{isAdmin ? "Action" : "Order"}</th>
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
                      {product.name}
                    </Link>
                  </td>
                  <td className="py-2 px-4">Rp {product.price.toLocaleString("id-ID")}</td>
                  <td className="py-2 px-4">{product.stock}</td>
                  <td className="py-2 px-4 space-x-2">
                    {isAdmin ? (
                      <>
                        <button onClick={() => handleEdit(product)} className="text-blue-500 hover:text-blue-700">Edit</button>
                        <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700">Delete</button>
                      </>
                    ) : (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          max={product.stock}
                          value={quantities[product.id] || 1}
                          onChange={(evt) => handleQuantityChange(product.id, evt.target.value)}
                          className="w-20 border border-gray-200 rounded-lg px-3 py-1"
                        />
                        <button
                          onClick={() => handleOrder(product)}
                          disabled={product.stock <= 0}
                          className="bg-[#00B074] text-white px-4 py-1 rounded-lg font-semibold hover:bg-[#009663] disabled:bg-gray-300"
                        >
                          Order
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
