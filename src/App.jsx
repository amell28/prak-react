import "./assets/tailwind.css"
import { Route, Routes } from "react-router-dom";
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import ErrorPage from "./pages/ErrorPage"; // Pastikan importnya benar

function App() {
  return (
    <div id="app-container" className="bg-gray-100 min-h-screen flex">
      <div id="layout-wrapper" className="flex flex-row flex-1">
        <Sidebar />
        <div id="main-content" className="flex-1 p-4">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />

            {/* Route Error Spesifik Sesuai Tugas */}
            <Route 
              path="/error-400" 
              element={<ErrorPage errorCode="400" title="Bad Request" description="Permintaan tidak valid. Silahkan periksa kembali inputan Anda." />} 
            />
            <Route 
              path="/error-401" 
              element={<ErrorPage errorCode="401" title="Unauthorized" description="Maaf, Anda tidak memiliki akses. Silahkan login terlebih dahulu." />} 
            />
            <Route 
              path="/error-403" 
              element={<ErrorPage errorCode="403" title="Forbidden" description="Akses dilarang! Anda tidak diizinkan masuk ke halaman ini." />} 
            />

            {/* 404 Not Found (Default) */}
            <Route 
              path="*" 
              element={<ErrorPage errorCode="404" title="Page Not Found" description="Halaman yang Anda cari tidak ditemukan atau telah dipindahkan." />} 
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;