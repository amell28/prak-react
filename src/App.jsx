import React, { useEffect, useState, lazy, Suspense } from 'react' // Tambahkan lazy & Suspense
import "./assets/tailwind.css"
import { Navigate, Route, Routes } from 'react-router-dom'
import Loading from './components/Loading'
import { supabase } from './service/supabaseClient'

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
// MainLayout & AuthLayout biasanya dibiarkan statis karena sering langsung dipakai
const MainLayout = React.lazy(() => import('./layouts/MainLayout'))
const AuthLayout = React.lazy(() => import('./layouts/AuthLayout'))

function App() {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [checkingAuth, setCheckingAuth] = useState(true)

  const loadProfile = async (user) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()

    if (data) {
      setProfile(data)
      return
    }

    const { data: createdProfile, error: createError } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        full_name: user.user_metadata?.full_name || user.email,
        role: "member",
        total_points: 0,
        tier: "Bronze",
      })
      .select("*")
      .single()

    if (createdProfile) {
      setProfile(createdProfile)
      return
    }

    console.error("Failed to load or create profile", error || createError)
    setProfile(null)
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      if (data.session?.user?.id) {
        loadProfile(data.session.user).finally(() => setCheckingAuth(false))
      } else {
        setCheckingAuth(false)
      }
    })

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      if (nextSession?.user?.id) {
        loadProfile(nextSession.user)
      } else {
        setProfile(null)
      }
    })

    return () => authListener.subscription.unsubscribe()
  }, [])

  const RequireAuth = ({ children, roles }) => {
    if (checkingAuth) return <Loading />
    if (!session) return <Navigate to="/login" replace />
    if (!profile) return <Loading />
    if (roles && !profile) return <Loading />
    if (roles && profile && !roles.includes(profile.role)) return <Navigate to="/error-403" replace />
    return children
  }

  const GuestOnly = ({ children }) => {
    if (checkingAuth) return <Loading />
    if (session) return <Navigate to="/" replace />
    return children
  }

  return (
    	<Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<RequireAuth><MainLayout profile={profile}/></RequireAuth>}>
               <Route path="/" element={<Dashboard profile={profile} />} />
               <Route path="/orders" element={<Orders profile={profile} />} />
               <Route path="/products" element={<Product profile={profile} />} />
               <Route path="/products/:id" element={<ProductDetail />} />
               <Route path="/customers" element={<RequireAuth roles={["admin"]}><Customers /></RequireAuth>} />
                
            {/* 404 Not Found (Default) */}
            <Route 
              path="*" 
              element={<ErrorPage errorCode="404" title="Page Not Found" description="Halaman yang Anda cari tidak ditemukan atau telah dipindahkan." />} 
            />
          </Route>

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

          <Route element={<AuthLayout/>}>
            <Route path="/login" element={<GuestOnly><Login /></GuestOnly>} />
            <Route path="/register" element={<GuestOnly><Register/></GuestOnly>} />
            <Route path="/forgot" element={<GuestOnly><Forgot/></GuestOnly>} />
        </Route>
          </Routes>
          </Suspense>
  );
}

export default App;
