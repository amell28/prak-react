import React, { useState, lazy, Suspense } from 'react' // Tambahkan lazy & Suspense
import "./assets/tailwind.css"
import { Route, Routes } from 'react-router-dom'
import Loading from './components/Loading'

// Ganti import statis menjadi lazy loading
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Orders = React.lazy(() => import('./pages/Orders'))
const Customers = React.lazy(() => import('./pages/Customers'))
const Product = React.lazy(() => import('./pages/Product'))
const ErrorPage = React.lazy(() => import('./pages/ErrorPage'))
const Login = React.lazy(() => import('./pages/auth/Login'))
const Register = React.lazy(() => import('./pages/auth/Register'))
const Forgot = React.lazy(() => import('./pages/auth/Forgot'))
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"))
const Components = React.lazy(() => import("./pages/Components"))

// MainLayout & AuthLayout biasanya dibiarkan statis karena sering langsung dipakai
const MainLayout = React.lazy(() => import('./layouts/MainLayout'))
const AuthLayout = React.lazy(() => import('./layouts/AuthLayout'))

function App() {
  return (
    	<Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<MainLayout/>}>
               <Route path="/" element={<Dashboard />} />
               <Route path="/orders" element={<Orders />} />
               <Route path="/products" element={<Product />} />
               <Route path="/products/:id" element={<ProductDetail />} />
               <Route path="/customers" element={<Customers />} />
                 <Route path="/components" element={<Components />} />

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
              </Route>
                <Route element={<AuthLayout/>}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/forgot" element={<Forgot/>} />
        </Route>
          </Routes>
          </Suspense>
  );
}

export default App;