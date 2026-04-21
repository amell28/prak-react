import PageHeader from "../components/PageHeader";
import ordersData from "../Ordersdata.json"; // Ambil file di src/Ordersdata.json
import { GrAdd } from "react-icons/gr";

export default function Orders() {
  return (
    <div id="dashboard-container">
      <PageHeader title="Orders" breadcrumb={["Dashboard", "Order data"]}>
        <button className="bg-[#00B074] text-white px-5 py-2 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#009663] transition-all">
          <GrAdd className="text-xl" />
          <span>Add Orders</span>
        </button>
      </PageHeader>

      <div className="p-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 font-medium">
              <tr>
                <th className="p-4 border-b">Order ID</th>
                <th className="p-4 border-b">Customer Name</th>
                <th className="p-4 border-b">Status</th>
                <th className="p-4 border-b">Total Price</th>
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
                  <td className="p-4">{order.customerName}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 font-semibold">
                    Rp {Number(order.totalPrice).toLocaleString("id-ID")}
                  </td>
                  <td className="p-4 text-gray-500">{order.orderDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
