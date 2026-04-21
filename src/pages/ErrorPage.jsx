// src/pages/ErrorPage.jsx
import { Link } from "react-router-dom";

// Terima props: errorCode, title, description, dan image (baru)
export default function ErrorPage({ errorCode, title, description, image }) {
    return (
        <div className="flex-1 min-h-[80vh] flex items-center justify-center p-6 bg-gray-50/50">
            <div className="bg-white p-16 rounded-[40px] shadow-lg border border-gray-100 flex flex-col items-center text-center max-w-lg w-full">
                
                {/* Bagian Gambar Error - Sekarang dinamis dari props */}
                <div className="mb-10">
                    {image ? (
                        <img src={image} alt={`Error ${errorCode}`} className="w-48 h-48 object-contain" />
                    ) : (
                        <div className="w-48 h-48 bg-gray-100 rounded-2xl animate-pulse" /> 
                    )}
                </div>
                
                <h1 className="text-9xl font-black text-gray-900 leading-none tracking-tighter mb-4 relative">
                    {errorCode}
                    <span className="absolute -top-1 -right-4 w-4 h-4 bg-[#00B074] rounded-full"></span>
                </h1>
                
                <h2 className="text-3xl font-bold text-gray-800 mb-3 tracking-tight">
                    {title}
                </h2>
                
                <p className="text-gray-400 text-lg leading-relaxed max-w-sm mb-12 px-2">
                    {description}
                </p>

                <Link 
                    to="/" 
                    className="flex items-center gap-2 bg-[#00B074] text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-[#009663] transition-all"
                >
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
}