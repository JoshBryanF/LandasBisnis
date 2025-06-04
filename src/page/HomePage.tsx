import { useEffect } from "react";
import { useTrail, animated } from "@react-spring/web";
import { Link } from "react-router";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { useFetchProjects } from "../api/useFetchProjects";

const HomePage = () => {
  const { projects, projectLoading, projectError, fetchProjects } = useFetchProjects();

  useEffect(() => {
    fetchProjects();
  }, []);

  const featured = projects.slice(0, 3);

  const trail = useTrail(featured.length, {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { mass: 1, tension: 200, friction: 20 },
    delay: 200,
  });

  return (
    <section>
      <NavBar />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#F9F9F9] py-16 px-6 flex items-center justify-center h-150">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/banner.jpg')" }}
        >
          <div className="w-full h-full bg-gradient-to-b from-transparent to-[#F9F9F9]" />
        </div>

        <div className="relative z-10 max-w-2xl text-center">
          <img
            src="/images/LandasBisnis-logo2.png"
            alt="Logo"
            className="mx-auto mb-6 w-50 h-auto"
          />
          <h2 className="text-3xl font-bold text-[#B82132] mb-4">
            Punya Ide atau Proposal Bisnis?
          </h2>
          <p className="text-gray-700 mb-6">
            Platform kami membantu mahasiswa menjembatani ide mereka dengan para investor.
            Ayo mulai kembangkan ide proyekmu menjadi kenyataan!
          </p>
        </div>
      </div>

      {/* Platform in Numbers */}
      <section className="bg-[#F9F9F9] py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#B82132] mb-10">Platform in Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-5xl font-bold text-[#B82132]">500+</h3>
              <p className="text-gray-600 mt-2">Proposal Diajukan</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold text-[#B82132]">150+</h3>
              <p className="text-gray-600 mt-2">Investor Terlibat</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold text-[#B82132]">300+</h3>
              <p className="text-gray-600 mt-2">Proyek Didanai</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#B82132]">Featured Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trail.map((style, i) => (
            <animated.div key={featured[i].id} style={style}>
              <Card {...featured[i]} />
            </animated.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#F6DED8] py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#B82132] mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div>
              <h3 className="text-xl font-semibold text-[#B82132] mb-2">1. Ajukan Proposal</h3>
              <p className="text-gray-700">
                Mahasiswa membuat akun dan mengunggah ide atau proposal bisnis mereka melalui formulir yang tersedia.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#B82132] mb-2">2. Tampil di Platform</h3>
              <p className="text-gray-700">
                Proposal yang lolos kurasi akan tampil di beranda dan dapat diakses oleh investor yang tertarik.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#B82132] mb-2">3. Dapatkan Investor</h3>
              <p className="text-gray-700">
                Investor dapat menghubungi mahasiswa secara langsung untuk mendiskusikan potensi pendanaan dan kolaborasi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#B82132] mb-10">Pertanyaan Umum</h2>
          <div className="space-y-6">
            {[
              {
                q: "Bagaimana cara memulai proyek?",
                a: "Klik tombol 'Start Project', isi formulir, dan unggah proposal Anda untuk ditinjau.",
              },
              {
                q: "Apakah platform ini hanya untuk mahasiswa?",
                a: "Ya, platform ini ditujukan khusus untuk mahasiswa Indonesia yang ingin memulai proyek bisnis.",
              },
              {
                q: "Apakah investor benar-benar bisa melihat semua proyek saya?",
                a: "Ya, investor yang tergabung akan melihat proyek yang telah dikurasi dan dipublikasikan.",
              },
            ].map((item, i) => (
              <div key={i} className="border-b pb-4">
                <h3 className="text-lg font-semibold text-[#B82132]">{item.q}</h3>
                <p className="text-gray-700 mt-1">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Involvement */}
      <section className="bg-[#B82132] text-white py-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Ingin Terlibat Lebih Dalam?</h2>
        <p className="mb-6">Bergabunglah sebagai mitra atau berikan testimoni Anda untuk menginspirasi yang lain.</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/register"
            className="bg-white text-[#B82132] font-semibold px-6 py-2 rounded-full hover:bg-[#F6DED8] transition"
          >
            Daftar Sekarang
          </Link>
          <Link
            to="/testimonials"
            className="bg-white text-[#B82132] font-semibold px-6 py-2 rounded-full hover:bg-[#F6DED8] transition"
          >
            Berikan Testimoni
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#B82132] mb-8">What People Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Ayu Setiawan",
                text: "Platform ini sangat membantu saya menemukan investor untuk startup kampus saya.",
                avatar: "https://i.pravatar.cc/100?img=1",
              },
              {
                name: "Budi Santoso",
                text: "Saya berhasil mendapatkan modal awal untuk ide saya hanya dalam 2 minggu.",
                avatar: "https://i.pravatar.cc/100?img=2",
              },
              {
                name: "Citra Lestari",
                text: "Sangat mudah digunakan dan dukungan timnya sangat responsif.",
                avatar: "https://i.pravatar.cc/100?img=3",
              },
            ].map((t, i) => (
              <div key={i} className="bg-[#F6DED8] p-6 rounded-lg shadow-md">
                <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full mx-auto mb-4" />
                <p className="text-gray-700 italic mb-2">"{t.text}"</p>
                <h4 className="text-[#B82132] font-semibold">{t.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </section>
  );
};

export default HomePage;
