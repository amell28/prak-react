import { GrAdd } from "react-icons/gr";
import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { supabase } from "../service/supabaseClient";

export default function Customers() {
  const [customersData, setCustomersData] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [dataForm, setDataForm] = useState({
    full_name: "",
    total_points: "",
    tier: "Bronze",
  })

  const loadCustomers = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "member")
      .order("created_at", { ascending: false })

    setCustomersData(data || [])
  }

  useEffect(() => {
    loadCustomers()
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
    if (!editingId) return

    await supabase
      .from("profiles")
      .update({
        full_name: dataForm.full_name,
        total_points: Number(dataForm.total_points),
        tier: dataForm.tier,
      })
      .eq("id", editingId)

    setEditingId(null)
    setDataForm({ full_name: "", total_points: "", tier: "Bronze" })
    loadCustomers()
  }

  const handleEdit = (item) => {
    setEditingId(item.id)
    setDataForm({
      full_name: item.full_name || "",
      total_points: item.total_points || 0,
      tier: item.tier || "Bronze",
    })
  }

  return (
    <div id="dashboard-container">
      <PageHeader title="Customers" breadcrumb={["Dashboard", "Customer data"]}>
        <button className="bg-[#00B074] text-white px-5 py-2 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#009663] transition-all">
          <GrAdd className="text-xl" />
          <span>Add Orders</span>
        </button>
      </PageHeader>

      <div className="p-4">
        {editingId ? (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 p-4 mb-4 grid md:grid-cols-4 gap-3">
            <input name="full_name" value={dataForm.full_name} onChange={handleChange} className="border border-gray-200 rounded-lg px-3 py-2" placeholder="Nama customer" />
            <input name="total_points" type="number" value={dataForm.total_points} onChange={handleChange} className="border border-gray-200 rounded-lg px-3 py-2" placeholder="Poin" />
            <select name="tier" value={dataForm.tier} onChange={handleChange} className="border border-gray-200 rounded-lg px-3 py-2">
              <option>Bronze</option>
              <option>Silver</option>
              <option>Gold</option>
              <option>Platinum</option>
            </select>
            <button className="bg-[#00B074] text-white px-5 py-2 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#009663] transition-all">
              Update Customer
            </button>
          </form>
        ) : null}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 font-medium">
              <tr>
                <th className="p-4 border-b">Customer ID</th>
                <th className="p-4 border-b">Name</th>
                <th className="p-4 border-b">Role</th>
                <th className="p-4 border-b">Points</th>
                <th className="p-4 border-b">Loyalty</th>
                <th className="p-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {customersData.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 border-b last:border-0 text-gray-700"
                >
                  <td className="p-4 font-medium ">{item.id}</td>
                  <td className="p-4">{item.full_name}</td>
                  <td className="p-4">{item.role}</td>
                  <td className="p-4">{item.total_points}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.tier === "Gold"
                          ? "bg-yellow-100 text-yellow-700"
                          : item.tier === "Silver"
                            ? "bg-gray-200 text-gray-700"
                            : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {item.tier}
                    </span>
                  </td>
                  <td className="p-4">
                    <button onClick={() => handleEdit(item)} className="text-blue-500 hover:text-blue-700">Edit</button>
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
