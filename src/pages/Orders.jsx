import PageHeader from "../components/PageHeader";
import { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { supabase } from "../service/supabaseClient";

export default function Orders({ profile }) {
  const [ordersData, setOrdersData] = useState([])
  const [products, setProducts] = useState([])
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [dataForm, setDataForm] = useState({
    product_id: "",
    quantity: 1,
  })

  const isAdmin = profile?.role === "admin"

  const loadOrders = async () => {
    if (!isAdmin && !profile?.id) return

    let query = supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })

    if (!isAdmin) {
      query = query.eq("member_id", profile.id)
    }

    const { data } = await query
    setOrdersData(data || [])
  }

  const loadProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .gt("stock", 0)
      .order("name")

    setProducts(data || [])
    if (data?.[0] && !dataForm.product_id) {
      setDataForm({
        product_id: data[0].id,
        quantity: 1,
      })
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    loadOrders()
  }, [profile?.id, isAdmin])

  const handleChange = (evt) => {
    const { name, value } = evt.target
    setDataForm({
      ...dataForm,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    setError("")

    if (!profile?.id) {
      setError("Profil belum selesai dimuat. Silakan coba lagi.")
      return
    }

    if (profile.role?.toLowerCase() !== "member") {
      setError("Hanya akun member yang bisa membuat pesanan")
      return
    }

    const productId = dataForm.product_id || products?.[0]?.id
    if (!productId) {
      setError("Belum ada produk dengan stok tersedia")
      return
    }

    const quantity = Number(dataForm.quantity) || 1
    const { error: orderError } = await supabase.rpc("create_member_order", {
      product_id: productId,
      quantity,
    })

    if (orderError) {
      setError(orderError.message || "Gagal membuat pesanan")
      return
    }

    setMessage("Pesanan berhasil dibuat")
    setDataForm({ ...dataForm, quantity: 1 })
    loadOrders()
    loadProducts()
  }

  const handleStatusChange = async (id, status) => {
    await supabase.from("orders").update({ status }).eq("id", id)
    loadOrders()
  }

  return (
    <div id="dashboard-container">
      <PageHeader title="Orders" breadcrumb={["Dashboard", "Order data"]}>
        {!isAdmin ? (
          <span className="rounded-lg bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Member Order
          </span>
        ) : null}
      </PageHeader>

      <div className="p-4">
        {message ? <div className="mb-4 rounded-lg bg-green-100 px-4 py-3 text-green-700">{message}</div> : null}
        {error ? <div className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-red-700">{error}</div> : null}
        {!isAdmin ? (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 p-4 mb-4 grid md:grid-cols-3 gap-3">
            <select name="product_id" value={dataForm.product_id} onChange={handleChange} className="border border-gray-200 rounded-lg px-3 py-2">
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} - Rp {Number(product.price).toLocaleString("id-ID")}
                </option>
              ))}
            </select>
            <input name="quantity" type="number" min="1" value={dataForm.quantity} onChange={handleChange} className="border border-gray-200 rounded-lg px-3 py-2" />
            <button disabled={!dataForm.product_id} className="bg-[#00B074] text-white px-5 py-2 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#009663] disabled:bg-gray-300 transition-all">
              <GrAdd className="text-xl" />
              <span>Buat Pesanan</span>
            </button>
          </form>
        ) : null}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 font-medium">
              <tr>
                <th className="p-4 border-b">Order ID</th>
                <th className="p-4 border-b">Member ID</th>
                <th className="p-4 border-b">Status</th>
                <th className="p-4 border-b">Total Price</th>
                <th className="p-4 border-b">Points</th>
                <th className="p-4 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {ordersData.map((order, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 border-b last:border-0 text-gray-700"
                >
                  <td className="p-4 font-medium">{order.id}</td>
                  <td className="p-4">{order.member_id}</td>
                  <td className="p-4">
                    {isAdmin ? (
                      <select value={order.status} onChange={(evt) => handleStatusChange(order.id, evt.target.value)} className="border border-gray-200 rounded-lg px-3 py-1">
                        <option value="pending">pending</option>
                        <option value="completed">completed</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                    ) : (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : order.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    )}
                  </td>
                  <td className="p-4 font-semibold">
                    Rp {Number(order.total_final_price).toLocaleString("id-ID")}
                  </td>
                  <td className="p-4">{order.points_earned}</td>
                  <td className="p-4 text-gray-500">{new Date(order.created_at).toLocaleDateString("id-ID")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
