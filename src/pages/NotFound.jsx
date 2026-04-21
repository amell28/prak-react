import React from 'react';
import { Link } from 'react-router-dom'; // Jika menggunakan react-router

export default function NotFound() {
    return (
        <div className="flex min-h-screen bg-[#F9FAFB]">
            {/* Sidebar Space Holder (Jika NotFound ini dibungkus layout utama, bagian ini bisa dihapus) */}
            
            <div className="flex-1 flex flex-col">
                {/* Konten Utama */}
                <div className="p-8">
                    {/* Page Header sesuai style di gambar */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-[#2D3748]">Page 404</h1>
                        <nav className="text-sm text-gray-500 mt-1">
                            Dashboard / <span className="text-gray-400">Error 404</span>
                        </nav>
                    </div>

                    {/* Card Error Content */}
                    <div className="bg-white rounded-2xl shadow-sm p-12 flex flex-col items-center justify-center text-center border border-gray-100">
                        <div className="relative mb-6">
                            {/* Ikon Error yang senada dengan icon stats di gambar */}
                            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Halaman Tidak Ditemukan</h2>
                        <p className="text-gray-500 max-w-sm mb-8">
                            Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
                        </p>

                        {/* Tombol dengan warna hijau khas 'Sedap' (#00B074) */}
                        <Link 
                            to="/" 
                            className="bg-[#00B074] hover:bg-[#009663] text-white font-medium py-3 px-8 rounded-xl transition-colors duration-200 shadow-lg shadow-green-100"
                        >
                            Kembali ke Dashboard
                        </Link>
                    </div>
                </div>

                {/* Footer simple seperti di gambar */}
                <footer className="mt-auto p-8 text-sm text-gray-400">
                    Sedap Restaurant Admin Dashboard <br />
                    © 2025 All Rights Reserved
                </footer>
            </div>
        </div>
    );
}