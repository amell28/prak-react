import { useState, useEffect } from "react"
import { AiFillDelete } from "react-icons/ai"
import { notesAPI } from "../service/notesAPI"
import GenericTable from "../components/GenericTable"
import LoadingSpinner from "../components/LoadingSpinner"
import EmptyState from "../components/EmptyState"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Notes() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [notes, setNotes] = useState([])
    
    const [dataForm, setDataForm] = useState({
        title: "", content: "", status: ""
    })

    const loadNotes = async () => {
        try {
            setLoading(true)
            setError("")
            const data = await notesAPI.fetchNotes()
            setNotes(data || [])
        } catch (err) {
            setError("Gagal memuat catatan")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadNotes()
    }, [])

    const handleChange = (evt) => {
        const { name, value } = evt.target
        setDataForm({
            ...dataForm,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            setError("")
            setSuccess("")
            await notesAPI.createNote(dataForm)
            setSuccess("Catatan berhasil ditambahkan!")
            setDataForm({ title: "", content: "", status: "" })
            setTimeout(() => setSuccess(""), 3000)
            loadNotes()
        } catch (err) {
            setError('Terjadi kesalahan: ${err.message}')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        const konfirmasi = window.confirm("Yakin ingin menghapus catatan ini?")
        if (!konfirmasi) return
        try {
            setLoading(true)
            setError("")
            setSuccess("")
            await notesAPI.deleteNote(id)
            loadNotes()
        } catch (err) {
            setError('Terjadi kesalahan: ${err.message}')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                        Notes App
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Kelola catatan harian Anda dengan mudah
                    </p>
                </div>
                <Badge
                    variant="secondary"
                    className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border-none font-medium text-xs px-3 py-1 rounded-full"
                >
                    Aktif
                </Badge>
            </div>

            <Card className="w-full border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100/40 dark:shadow-none bg-white dark:bg-slate-950">
                <CardHeader className="space-y-1.5 p-6 border-b border-slate-50 dark:border-slate-900">
                    <CardTitle className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                        Tambah Catatan Baru
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        Isi form di bawah ini untuk menyimpan memo baru ke database.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl border border-red-200 text-sm font-medium">
                             {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-200 text-sm font-medium">
                             {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="title"
                            value={dataForm.title}
                            placeholder="Judul catatan"
                            onChange={handleChange}
                            required
                            disabled={loading}
                            className="w-full p-3 bg-gray-50 dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 text-sm"
                        />

                        <textarea
                            name="content"
                            value={dataForm.content}
                            placeholder="Isi catatan"
                            onChange={handleChange}
                            required
                            disabled={loading}
                            rows="3"
                            className="w-full p-3 bg-gray-50 dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none disabled:opacity-50 text-sm"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg text-sm"
                        >
                            {loading ? "Mohon Tunggu..." : "Tambah Data"}
                        </button>
                    </form>
                </CardContent>
            </Card>

            {loading && <LoadingSpinner text="Memuat catatan..." />}

            {!loading && notes.length === 0 && !error && (
                <EmptyState text="Belum ada catatan. Tambah catatan pertama!" />
            )}

            {!loading && notes.length === 0 && error && (
                <EmptyState text="Terjadi Kesalahan. Coba lagi nanti." />
            )}

            {!loading && notes.length > 0 ? (
                <Card className="w-full border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100/40 dark:shadow-none bg-white dark:bg-slate-950 overflow-hidden">
                    <CardHeader className="space-y-1.5 p-6 border-b border-slate-50 dark:border-slate-900">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                                Daftar Catatan
                            </CardTitle>
                            <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-2.5 py-0.5 text-xs font-semibold">
                                {notes.length} Total
                            </Badge>
                        </div>
                        <CardDescription className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            Daftar seluruh memo yang tersimpan di dalam sistem.
                        </CardDescription>
                    </CardHeader>
                    
                    <div className="p-2">
                        <GenericTable
                            columns={["No", "Judul", "Isi Catatan", "Aksi"]}
                            data={notes}
                            renderRow={(note, index) => (
                                <>
                                    <td className="px-6 py-4 font-medium text-gray-700 dark:text-slate-300">
                                        {index + 1}.
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-emerald-600 dark:text-emerald-400">
                                            {note.title}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 max-w-xs">
                                        <div className="truncate text-gray-600 dark:text-slate-400">
                                            {note.content}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleDelete(note.id)}
                                            disabled={loading}
                                            className="p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors group"
                                        >
                                            <AiFillDelete className="text-gray-400 group-hover:text-red-500 text-xl transition-colors" />
                                        </button>
                                    </td>
                                </>
                            )}
                        />
                    </div>
                </Card>
            ) : null}
        </div>
    )
}