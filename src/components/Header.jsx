import { FaBell, FaSearch } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { supabase } from "../service/supabaseClient";

export default function Header({ profile }) {
    const navigate = useNavigate()
    const displayName = profile?.full_name || "User"
    const roleLabel = profile?.role === "admin" ? "Admin" : "Member"

    const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate("/login", { replace: true })
    }

    return (
        <div id="header-container" className="flex justify-between items-center p-4">
            {/* Search Bar */}
            <div id="search-bar" className="relative w-full max-w-lg">
                <input
                    id="search-input"
                    className="border border-gray-100 p-2 pr-10
                     bg-white w-full max-w-xs focus:max-w-lg 
                     transition-all duration-300 rounded-md outline-none
                      focus:ring-2 focus:ring-green-100"                    type="text"
                    placeholder="Search Here..."
                />
                <FaSearch id="search-icon" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
            </div>

            {/* Icon & Profile Section */}
            <div id="icons-container" className="flex items-center space-x-4">
                {/* Icons */}
                <div id="notification-icon" className="relative p-3 bg-blue-100 rounded-2xl text-blue-500 cursor-pointer">
                    <FaBell />
                    <span id="notification-badge" className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-200 rounded-full px-2 py-1 text-xs">50</span>
                </div>
                <div id="chart-icon" className="p-3 bg-blue-100 rounded-2xl cursor-pointer">
                    <FcAreaChart />
                </div>
                <div id="settings-icon" className="p-3 bg-red-100 rounded-2xl text-red-500 cursor-pointer">
                    <SlSettings />
                </div>

                {/* Profile Section */}
                <div id="profile-container" className="flex items-center space-x-4 border-l pl-4 border-gray-300">
                    <div id="profile-text" className="flex flex-col leading-tight">
                        <span>Hello, <b>{displayName}</b></span>
                        <span className="text-xs font-semibold text-hijau uppercase">{roleLabel}</span>
                    </div>
                    <img
                        id="profile-avatar"
                        src="https://images.pexels.com/photos/18253842/pexels-photo-18253842.jpeg"
                        className="w-10 h-10 rounded-full"
                    />
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-lg bg-red-100 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-200 transition-colors"
                    >
                        <FiLogOut />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
