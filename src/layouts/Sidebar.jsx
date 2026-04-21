import { MdDashboard } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { AiOutlineCustomerService } from "react-icons/ai";
import { HiOutlineExclamation, HiOutlineLockClosed, HiOutlineUserRemove } from "react-icons/hi"; // Ikon tambahan
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 space-x-2 transition-all
        ${
          isActive
            ? "text-hijau bg-pink-200 font-extrabold"
            : "text-gray-600 hover:text-hijau hover:bg-pink-200 hover:font-extrabold"
        }`

  return (
    <div id="sidebar" className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg">
      {/* Logo */}
      <div id="sidebar-logo" className="flex flex-col">
        <span className="font-poppins text-[48px] text-gray-900">
          Sedap <b className="text-hijau">.</b>
        </span>
        <span className="font-semibold text-gray-400">Modern Admin Dashboard</span>
      </div>

      {/* List Menu */}
      <div id="sidebar-menu" className="mt-10 overflow-y-auto">
        <ul id="menu-list" className="space-y-3">
          <li>
            <NavLink to="/" className={menuClass}>
              <MdDashboard className="mr-4 text-xl" /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className={menuClass}>
              <CiShoppingCart className="mr-4 text-xl" /> Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/customers" className={menuClass}>
              <AiOutlineCustomerService className="mr-4 text-xl" /> Customers
            </NavLink>
          </li>

          {/* HR Divider (Opsional biar rapi) */}
          <hr className="my-4 border-gray-100" />
          <p className="text-xs font-bold text-gray-400 px-4 mb-2 uppercase tracking-widest">Error Pages</p>

          {/* Link Error Sesuai Perintah */}
          <li>
            <NavLink to="/error-400" className={menuClass}>
              <HiOutlineExclamation className="mr-4 text-xl" /> Error 400
            </NavLink>
          </li>
          <li>
            <NavLink to="/error-401" className={menuClass}>
              <HiOutlineUserRemove className="mr-4 text-xl" /> Error 401
            </NavLink>
          </li>
          <li>
            <NavLink to="/error-403" className={menuClass}>
              <HiOutlineLockClosed className="mr-4 text-xl" /> Error 403
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div id="sidebar-footer" className="mt-auto">
        <div
          id="footer-card"
          className="bg-hijau px-4 py-2 rounded-md shadow-lg mb-10 flex items-center"
        >
          <div id="footer-text" className="text-white text-sm">
            <span>Please organize your menus through button below!</span>
            <div
              id="add-menu-button"
              className="flex justify-center items-center p-2 mt-3 bg-white rounded-md space-x-2"
            >
              <FaPlus className="mr-4 text-xl" />
              <span className="text-gray-600 flex items-center">Add Menus</span>
            </div>
          </div>
          <img
            id="footer-avatar"
            className="w-20 rounded-full"
            src="https://images.pexels.com/photos/18253842/pexels-photo-18253842.jpeg"
          />
        </div>
        <span id="footer-brand" className="font-bold text-gray-400">
          Sedap Restaurant Admin Dashboard
        </span>
        <p id="footer-copyright" className="font-light text-gray-400">
          &copy; 2025 All Right Reserved
        </p>
      </div>
    </div>
  );
}
