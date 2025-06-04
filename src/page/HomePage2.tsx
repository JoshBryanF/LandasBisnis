import Footer from "../components/Footer";
import NavBar from "../components/NavBar"
import Card from "../components/Card";
import { Link } from "react-router";
import { useFetchProjects } from "../api/useFetchProjects";
import { useEffect } from "react";
import { useTrail, animated } from "@react-spring/web";
// import { getUser } from "../utils/Auth";


const HomePage2 = () => {
  const {projects, projectLoading, projectError, fetchProjects} = useFetchProjects();
  useEffect(() => {
    fetchProjects();
  }, []);
  const trail = useTrail(projects.length, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { mass: 1, tension: 200, friction: 20 },
    delay: 200,
  });
  return (
    <section>
      <NavBar />

      {/* Hero Section */}
      <section className="relative bg-[url(/images/banner.jpg)] lg:grid lg:h-screen lg:place-content-center bg-cover bg-center bg-no-repeat w-full">
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="relative z-10 mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32 transition-all duration-700 ease-in-out opacity-100 translate-y-0">
          <div className="mx-auto max-w-prose text-center text-white">
            <h1 className="text-4xl font-bold sm:text-5xl">
              Start <strong className="text-[#B82132]">Your Journey</strong> Today
            </h1>
            <p className="mt-4 text-base sm:text-lg/relaxed">
              Temukan mitra, peluang, dan ide bisnis terbaik di satu platform.
            </p>
            
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <h2 className="text-3xl font-bold text-center text-[#B82132] mt-16 mb-8">Popular Projects</h2>

      <div className="m-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {trail.map((style, index) => (
          <animated.div
            key={projects[index].id}
            style={style}
            className="transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-lg"
          >
            <Card {...projects[index]} />
          </animated.div>
        ))}
      </div>

      {/* Start Project Section */}
      <section className="bg-[#F6DED8] py-16 px-6 text-center transition-all duration-700 ease-in-out opacity-100 translate-y-0">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#B82132] mb-4">Punya Ide atau Proposal Bisnis?</h2>
          <p className="text-gray-700 mb-6">
            Kami membuka peluang bagi Anda untuk mengajukan proposal dan memulai kolaborasi bersama.
            Jika Anda memiliki ide inovatif, proyek sosial, atau rencana bisnis yang potensial, ayo mulai sekarang!
          </p>
          <Link
            to="/start-project"
            className="inline-block bg-[#B82132] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#D2665A] hover:scale-105 transition duration-300"
          >
            Start Project
          </Link>
        </div>
      </section>


    

        <section className="bg-white py-16 px-6">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-3xl font-bold text-[#B82132] mb-8">What People Are Saying</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          name: "Ayu Setiawan",
          text: "Platform ini sangat membantu saya menemukan partner bisnis terbaik untuk startup saya.",
          avatar: "https://i.pravatar.cc/100?img=1",
        },
        {
          name: "Budi Santoso",
          text: "Saya berhasil memperluas jaringan kolaborasi berkat fitur-fitur yang sangat intuitif.",
          avatar: "https://i.pravatar.cc/100?img=2",
        },
        {
          name: "Citra Lestari",
          text: "Desainnya simpel tapi powerful. Sangat mendukung pengajuan proposal saya.",
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

<section className="bg-[#F9F9F9] py-16 px-6">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-3xl font-bold text-[#B82132] mb-10">Platform in Numbers</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-5xl font-bold text-[#B82132]">500+</h3>
        <p className="text-gray-600 mt-2">Proyek Telah Diajukan</p>
      </div>
      <div>
        <h3 className="text-5xl font-bold text-[#B82132]">200+</h3>
        <p className="text-gray-600 mt-2">Mitra Telah Bergabung</p>
      </div>
      <div>
        <h3 className="text-5xl font-bold text-[#B82132]">95%</h3>
        <p className="text-gray-600 mt-2">Tingkat Kepuasan Pengguna</p>
      </div>
    </div>
  </div>
</section>

<section className="bg-white py-16 px-6">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl font-bold text-center text-[#B82132] mb-10">Pertanyaan Umum</h2>
    <div className="space-y-6">
      {[
        {
          q: "Bagaimana cara memulai proyek?",
          a: "Anda bisa klik tombol 'Start Project', lalu isi formulir dan unggah proposal Anda.",
        },
        {
          q: "Apakah platform ini gratis?",
          a: "Ya, platform ini bisa digunakan secara gratis untuk semua pengguna terdaftar.",
        },
        {
          q: "Siapa yang bisa melihat proyek saya?",
          a: "Proyek Anda akan ditampilkan di beranda dan bisa dilihat oleh semua mitra yang tergabung.",
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



      <Footer />
    </section>
  );
};

export default HomePage2;
