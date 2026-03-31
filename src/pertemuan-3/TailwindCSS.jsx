export default function TailWindCSS() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {/* 1. FLEXBOXGRID & NAVBAR (Paling Bagus & Terintegrasi) */}
      <nav className="sticky top-0 z-50 bg-pink-500/90 backdrop-blur-sm p-4 text-white shadow-lg border-b border-pink-600">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-extrabold tracking-tighter hover:text-pink-100 transition cursor-pointer">
            MyWebsite <span className="text-xs font-normal opacity-70">Tailwind Showcase</span>
          </h1>
          <ul className="flex space-x-8 items-center font-medium">
            <li><a href="#" className="hover:text-pink-100 transition decoration-pink-100 underline-offset-4 hover:underline">Home</a></li>
            <li><a href="#" className="hover:text-pink-100 transition decoration-pink-100 underline-offset-4 hover:underline">About</a></li>
            <li><a href="#" className="hover:text-pink-100 transition decoration-pink-100 underline-offset-4 hover:underline">Contact</a></li>
          </ul>
          {/* borderRadius & Blue Border Button (Integrated to Nav) */}
          <button className="border-2 border-white text-white px-5 py-2 rounded-full font-semibold hover:bg-white hover:text-pink-600 shadow-md transition-all duration-300">
            Login
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-8 lg:p-12">
        {/* 2. HEADER & BORDER CONCEPT (Integrated to section) */}
        <header className="mb-16 border-l-8 border-gradient-to-b from-pink-500 via-yellow-400 to-sky-500 pl-8 py-6 bg-white shadow-xl rounded-r-3xl">
          <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tighter text-slate-950">
            <span className="bg-gradient-to-r from-pink-600 to-amber-500 bg-clip-text text-transparent">
              Belajar Tailwind CSS 4
            </span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl">
            Selamat datang di masterclass visual. Di sini, kita mengubah semua elemen dasar Tailwind Anda menjadi satu desain yang kohesif, modern, dan sangat bagus.
          </p>
          <div className="mt-8">
            <button className="bg-yellow-400 text-slate-950 px-8 py-3 rounded-full font-bold text-lg shadow-xl hover:bg-yellow-300 hover:scale-105 hover:shadow-2xl transition-all duration-300">
              Click Me & Start Exploring
            </button>
          </div>
        </header>

        {/* 3. LAYOUT & SPACING (Main Grid Content) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Card 1: Layout & Spacing (Integrated Shadow Effects) */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Layout & Spacing</h2>
                <span className="p-3 bg-slate-100 text-slate-500 rounded-2xl group-hover:bg-slate-200 transition">
                  {/* Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v16.5m0-16.5h16.5m-16.5 0v16.5m0 0h16.5m-16.5 0V3.75m16.5 0v16.5m0-16.5H3.75m16.5 0v16.5" /></svg>
                </span>
            </div>
            <p className="text-slate-600 leading-relaxed mb-6">
                Ini adalah contoh penggunaan <code className="bg-slate-100 text-pink-600 p-1 rounded-md">p-10</code> (padding), <code className="bg-slate-100 text-pink-600 p-1 rounded-md">m-4</code> (margin), <code className="bg-slate-100 text-pink-600 p-1 rounded-md">rounded-3xl</code>, dan <code className="bg-slate-100 text-pink-600 p-1 rounded-md">shadow-xl</code> di Tailwind. Terlihat sangat rapi, bukan?
            </p>
            <p className="text-slate-600 leading-relaxed">
              Jarak antar elemen di kartu ini dan jarak antar kartu di grid ini menggunakan class <code className="bg-slate-100 text-pink-600 p-1 rounded-md">gap-10</code>.
            </p>
          </div>

          {/* Card 2: Advanced Typography */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Advanced Typography</h2>
                <span className="p-3 bg-slate-100 text-slate-500 rounded-2xl group-hover:bg-slate-200 transition">
                  {/* Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25l7.5-7.5m-7.5 7.5l-7.5-7.5M12 20.25V3.75" /></svg>
                </span>
            </div>
            <h3 className="text-4xl font-black text-slate-900 underline decoration-pink-500 decoration-wavy decoration-4 underline-offset-8">
              Tailwind Typography
            </h3>
            <p className="mt-8 text-slate-600 text-sm leading-relaxed max-w-md">
              Belajar Tailwind sangat menyenangkan dan cepat! Kita bisa mengatur <span className="font-bold text-pink-600">size</span>, <span className="font-extrabold text-amber-500">weight</span>, <span className="underline decoration-yellow-400">decoration</span>, dan bahkan <span className="italic">style</span> teks hanya dengan class-class utilitas.
            </p>
          </div>

          {/* Card 3: Interaction & Colors (Integrated BackgroundColors) */}
          <div className="bg-yellow-500 text-white p-10 rounded-3xl shadow-xl hover:bg-amber-400 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 cursor-pointer group">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold tracking-tight">Interaction & Colors</h2>
                <span className="p-3 bg-amber-400 text-white rounded-2xl group-hover:bg-amber-300 transition shadow-inner">
                  {/* Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
                </span>
            </div>
            <h3 className="text-3xl font-extrabold tracking-tight">Tailwind Masterclass</h3>
            <p className="mt-4 text-white leading-relaxed">
              Ini adalah kartu dengan latar belakang <code className="bg-amber-600/50 p-1 rounded">bg-yellow-500</code>. Teksnya berwarna putih, dan jika Anda mengarahkan mouse, kartu ini akan berubah warna (<code className="bg-amber-600/50 p-1 rounded">hover:bg-amber-400</code>), membesar sedikit, dan bayangannya menjadi lebih dalam.
            </p>
            <p className="mt-4">Belajar Tailwind itu seru, interaktif, dan fleksibel!</p>
          </div>
          
          {/* Card 4: Visual Effects & Shadows */}
          <div className="lg:col-span-2 bg-white p-10 rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 group">
             <div className="flex items-center justify-between mb-8 border-b pb-6">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Visual Effects & Shadows</h2>
                <p className="text-slate-600 text-lg font-bold">Arahkan mouse Anda!</p>
            </div>
            <div className="p-10 bg-slate-50 shadow-lg rounded-2xl hover:shadow-2xl transition-all duration-500 cursor-pointer group-hover:scale-[1.01] border-2 border-slate-100 hover:border-pink-200">
                <h3 className="text-2xl font-semibold text-slate-950">Hover me! (Paling Bagus)</h3>
                <p className="text-slate-600 mt-3 leading-relaxed">
                    Lihat efek bayangan saat Anda melakukan hover pada kartu ini. Class <code className="bg-slate-100 text-pink-600 p-1 rounded-md">hover:shadow-2xl</code> dan <code className="bg-slate-100 text-pink-600 p-1 rounded-md">transition</code> membuat transisi visual ini terlihat sangat halus, profesional, dan 'paling bagus'.
                </p>
                <div className="mt-6">
                  <span className="inline-block bg-pink-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md">
                    Effect Demo
                  </span>
                </div>
            </div>
          </div>

          {/* Card 5: Controls & Borders (Integrated BorderRadius button) */}
           <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 group">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Controls & Borders</h2>
                <span className="p-3 bg-slate-100 text-slate-500 rounded-2xl group-hover:bg-slate-200 transition">
                  {/* Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                </span>
            </div>
            <p className="text-slate-600 leading-relaxed mb-8">
                Halaman ini mendemonstrasikan berbagai macam radius sudut, dari <code className="bg-slate-100 text-pink-600 p-1 rounded-md">rounded-3xl</code> untuk kartu ini, <code className="bg-slate-100 text-pink-600 p-1 rounded-md">rounded-r-3xl</code> untuk header, dan tombol di bawah ini yang menggunakan <code className="bg-slate-100 text-pink-600 p-1 rounded-md">rounded-lg</code>.
            </p>
             {/* borderRadius & Blue Border Button (Integrated to card) */}
            <button className="w-full m-0 border-2 border-blue-500 text-blue-900 px-6 py-3.5 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-inner flex items-center justify-center space-x-2"> 
                {/* Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M17.757 14.743l1.59 1.59M6.243 14.743l-1.59 1.59M3.75 10.5H6m.166-5.834 1.591 1.591" /></svg>
                <span>Klik Saya (Bagus)</span>
            </button>
          </div>
        </div>

        {/* 4. INTEGRATED FLEXBOX COMPONENTS (Footer section) */}
        <footer className="mt-20 pt-10 border-t border-slate-200">
          <nav className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-3xl shadow-xl border border-slate-100 text-slate-800 space-y-6 md:space-y-0">
              <h2 className="text-xl font-bold tracking-tight">Mastering Tailwind CSS Footer</h2>
              <ul className="flex space-x-6 items-center font-medium">
                  <li><a href="#" className="hover:text-pink-600 transition">About</a></li>
                  <li><a href="#" className="hover:text-pink-600 transition">Careers</a></li>
                  <li><a href="#" className="hover:text-pink-600 transition">Support</a></li>
              </ul>
              <div className="text-sm font-bold">
                  Login &copy; 2024 Tailwind Showcase
              </div>
          </nav>
        </footer>

      </main>
    </div>
  )
}