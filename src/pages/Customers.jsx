import { GrAdd } from "react-icons/gr";
import PageHeader from "../components/PageHeader";
import customersData from "../Customersdata.json"; // Ambil file di src/Customersdata.json

export default function Customers() {
  return (
    <div id="dashboard-container">
      <PageHeader title="Customers" breadcrumb={["Dashboard", "Customer data"]}>
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
                <th className="p-4 border-b">Customer ID</th>
                <th className="p-4 border-b">Name</th>
                <th className="p-4 border-b">Email</th>
                <th className="p-4 border-b">Phone</th>
                <th className="p-4 border-b">Loyalty</th>
              </tr>
            </thead>
            <tbody>
              {customersData.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 border-b last:border-0 text-gray-700"
                >
                  <td className="p-4 font-medium ">{item.id}</td>
                  <td className="p-4">{item.name}</td>
                  <td className="p-4">{item.email}</td>
                  <td className="p-4">{item.phone}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.loyalty === "Gold"
                          ? "bg-yellow-100 text-yellow-700"
                          : item.loyalty === "Silver"
                            ? "bg-gray-200 text-gray-700"
                            : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {item.loyalty}
                    </span>
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
