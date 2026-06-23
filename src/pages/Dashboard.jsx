import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { supabase } from "../service/supabaseClient";
import { getDiscountByTier } from "../lib/utils";

export default function Dashboard() {
    const [profile, setProfile] = useState(null)
    const [stats, setStats] = useState({
        products: 0,
        customers: 0,
        orders: 0,
        revenue: 0,
        points: 0,
        tier: "Bronze",
    })

    useEffect(() => {
        const loadDashboard = async () => {
            const { data: userData } = await supabase.auth.getUser()
            if (!userData.user) return

            const { data: currentProfile } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", userData.user.id)
                .single()

            setProfile(currentProfile)

            if (currentProfile?.role === "admin") {
                const [{ count: products }, { count: customers }, { data: orders }] = await Promise.all([
                    supabase.from("products").select("*", { count: "exact", head: true }),
                    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "member"),
                    supabase.from("orders").select("total_final_price"),
                ])

                setStats({
                    products: products || 0,
                    customers: customers || 0,
                    orders: orders?.length || 0,
                    revenue: orders?.reduce((total, order) => total + Number(order.total_final_price || 0), 0) || 0,
                    points: currentProfile.total_points || 0,
                    tier: currentProfile.tier || "Bronze",
                })
                return
            }

            const { data: orders } = await supabase
                .from("orders")
                .select("total_final_price")
                .eq("member_id", userData.user.id)

            setStats({
                products: 0,
                customers: 0,
                orders: orders?.length || 0,
                revenue: orders?.reduce((total, order) => total + Number(order.total_final_price || 0), 0) || 0,
                points: currentProfile?.total_points || 0,
                tier: currentProfile?.tier || "Bronze",
            })
        }

        loadDashboard()
    }, [])

    const isAdmin = profile?.role === "admin"
    const roleLabel = isAdmin ? "Admin" : "Member"
    const discountRate = isAdmin ? null : getDiscountByTier(profile?.tier)
    const memberPoints = profile?.total_points || 0

    const getNextTier = () => {
        if (memberPoints <= 100) return { label: "Silver", needed: 101 - memberPoints }
        if (memberPoints <= 500) return { label: "Gold", needed: 501 - memberPoints }
        if (memberPoints <= 1000) return { label: "Platinum", needed: 1001 - memberPoints }
        return { label: "Platinum", needed: 0 }
    }

    const nextTier = getNextTier()
    const progressPercent = (() => {
        if (profile?.tier === "Bronze") return Math.min(100, (memberPoints / 100) * 100)
        if (profile?.tier === "Silver") return Math.min(100, ((memberPoints - 101) / 399) * 100)
        if (profile?.tier === "Gold") return Math.min(100, ((memberPoints - 501) / 499) * 100)
        return 100
    })()

    return (
        <div id="dashboard-container" className="space-y-6">
            <PageHeader title="Dashboard" />

            <div className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
                <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-slate-500">Selamat datang kembali,</p>
                            <h1 className="text-4xl font-bold text-slate-900">{profile?.full_name || "Pengguna"}</h1>
                            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
                                {isAdmin
                                    ? "Lihat ringkasan operasional terbaru dan kelola semua sumber daya sistem Anda dari dashboard ini."
                                    : "Pantau poin, tier, dan pemesanan Anda. Nikmati diskon tier terbaik saat membuat order."}
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <div className={`rounded-full px-4 py-2 text-sm font-semibold ${isAdmin ? "bg-sky-100 text-sky-700" : "bg-emerald-100 text-emerald-700"}`}>
                                {roleLabel}
                            </div>
                            {!isAdmin ? (
                                <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                                    Diskon Tier: {discountRate}%
                                </div>
                            ) : null}
                        </div>
                    </div>

                    {!isAdmin ? (
                        <div className="mt-8 rounded-3xl bg-slate-50 p-5">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Tier saat ini</p>
                                    <p className="text-3xl font-bold text-slate-900">{profile?.tier || "Bronze"}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-slate-500">Poin Anda</p>
                                    <p className="text-3xl font-bold text-slate-900">{memberPoints}</p>
                                </div>
                            </div>
                            <div className="mt-4 text-sm text-slate-600">
                                {nextTier.needed > 0
                                    ? `Butuh ${nextTier.needed} poin lagi untuk naik ke tier ${nextTier.label}.`
                                    : "Anda berada di tier Platinum, nikmati diskon tertinggi!"}
                            </div>
                            <div className="mt-4 rounded-full bg-white p-1">
                                <div className="h-3 rounded-full bg-emerald-300" style={{ width: `${progressPercent}%` }} />
                            </div>
                        </div>
                    ) : (
                        <div className="mt-8 rounded-3xl bg-slate-50 p-5 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-3xl bg-white p-4 shadow-sm border border-slate-200">
                                <p className="text-sm text-slate-500">Pendapatan Bulanan</p>
                                <p className="mt-3 text-3xl font-bold text-slate-900">Rp {Number(stats.revenue).toLocaleString("id-ID")}</p>
                            </div>
                            <div className="rounded-3xl bg-white p-4 shadow-sm border border-slate-200">
                                <p className="text-sm text-slate-500">Customer Aktif</p>
                                <p className="mt-3 text-3xl font-bold text-slate-900">{stats.customers}</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid gap-4">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Ringkasan Utama</p>
                        <div className="mt-4 grid gap-4">
                            <div className="flex items-center justify-between rounded-3xl bg-slate-50 p-4">
                                <div>
                                    <p className="text-sm text-slate-500">Produk</p>
                                    <p className="text-2xl font-bold text-slate-900">{stats.products}</p>
                                </div>
                                <div className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">Aktif</div>
                            </div>
                            <div className="flex items-center justify-between rounded-3xl bg-slate-50 p-4">
                                <div>
                                    <p className="text-sm text-slate-500">Pesanan</p>
                                    <p className="text-2xl font-bold text-slate-900">{stats.orders}</p>
                                </div>
                                <div className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">Total</div>
                            </div>
                            <div className="flex items-center justify-between rounded-3xl bg-slate-50 p-4">
                                <div>
                                    <p className="text-sm text-slate-500">Pendapatan</p>
                                    <p className="text-2xl font-bold text-slate-900">Rp {Number(stats.revenue).toLocaleString("id-ID")}</p>
                                </div>
                                <div className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">Ringkas</div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Saran Cepat</p>
                        <ul className="mt-4 space-y-3 text-sm text-slate-600">
                            {isAdmin ? (
                                <>
                                    <li>• Periksa produk dengan stok rendah dan update segera.</li>
                                    <li>• Tinjau pesanan terbaru untuk memastikan pengiriman cepat.</li>
                                </>
                            ) : (
                                <>
                                    <li>• Gunakan diskon tier Anda saat pesan produk baru.</li>
                                    <li>• Semakin sering berbelanja, semakin cepat naik tier.</li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
