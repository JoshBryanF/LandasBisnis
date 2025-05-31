import Footer from "../components/Footer";
import NavBar from "../components/NavBar"
import Card from "../components/Card";
import { Link } from "react-router";
import { useFetchProjects } from "../api/useFetchProjects";
import { useEffect } from "react";
import { getUser } from "../utils/Auth";

// const dummyData = [
//   {
//     id: "1",
//     name: "Business A",
//     address: "Jl. Mawar No. 1",
//     phone: "0812-3456-7890",
//     email: "businessA@example.com",
//     description: "Kami menyediakan layanan konsultasi bisnis profesional dan terpercaya untuk pengembangan UMKM.",
//     imageUrl: "https://source.unsplash.com/400x300/?office",
//   },
//   {
//     id: "2",
//     name: "Business B",
//     address: "Jl. Melati No. 2",
//     phone: "0821-7654-3210",
//     email: "businessB@example.com",
//     description: "Spesialis dalam solusi digital marketing dan manajemen media sosial untuk pelaku usaha.",
//     imageUrl: "https://source.unsplash.com/400x300/?startup",
//   },
//   {
//     id: "3",
//     name: "Business C",
//     address: "Jl. Kenanga No. 3",
//     phone: "0852-1111-2222",
//     email: "businessC@example.com",
//     description: "Kami membantu bisnis Anda dengan layanan desain grafis profesional dan brand identity.",
//     imageUrl: "https://source.unsplash.com/400x300/?coworking",
//   },
//   {
//     id: "4",
//     name: "Business D",
//     address: "Jl. Anggrek No. 4",
//     phone: "0877-3333-4444",
//     email: "businessD@example.com",
//     description: "Layanan akuntansi dan keuangan terpercaya untuk bisnis skala kecil dan menengah.",
//     imageUrl: "https://source.unsplash.com/400x300/?meeting",
//   },
//   {
//     id: "5",
//     name: "Business E",
//     address: "Jl. Flamboyan No. 5",
//     phone: "0813-5555-6666",
//     email: "businessE@example.com",
//     description: "Menawarkan pelatihan dan workshop pengembangan diri serta kepemimpinan.",
//     imageUrl: "https://source.unsplash.com/400x300/?training",
//   },
//   {
//     id: "6",
//     name: "Business F",
//     address: "Jl. Cemara No. 6",
//     phone: "0896-7777-8888",
//     email: "businessF@example.com",
//     description: "Kami adalah agensi kreatif yang fokus pada inovasi desain dan user experience.",
//     imageUrl: "https://source.unsplash.com/400x300/?creative",
//   },
//   {
//     id: "7",
//     name: "Business G",
//     address: "Jl. Sakura No. 7",
//     phone: "0838-9999-0000",
//     email: "businessG@example.com",
//     description: "Platform marketplace lokal untuk produk-produk handmade dan kerajinan asli Indonesia.",
//     imageUrl: "https://source.unsplash.com/400x300/?market",
//   },
//   {
//     id: "8",
//     name: "Business H",
//     address: "Jl. Teratai No. 8",
//     phone: "0819-1234-5678",
//     email: "businessH@example.com",
//     description: "Konsultan teknologi dan pengembangan software custom untuk bisnis digital.",
//     imageUrl: "https://source.unsplash.com/400x300/?technology",
//   },
// ];

const HomePage = () => {
  console.log(getUser()?.id)

    const {projects, projectLoading, projectError, fetchProjects} = useFetchProjects();
  // useEffect({}, [])
  useEffect(() => {
    fetchProjects();
  }, []);
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
        {projects.map((data, index) => (
          <div
  key={data.id}
  className={`opacity-0 translate-y-4 animate-[fadeIn_0.6s_ease-out_forwards] transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-lg`}
  style={{
    animationDelay: `${index * 100}ms`,
  }}
>
  <Card {...data} />
</div>

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


    <section className="bg-[#F9F9F9] py-16 px-6">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
    {/* Gambar */}
    <div className="md:w-1/2">
      <img
        src="/images/abtus.jpg"
        alt="About Us"
        className="rounded-lg shadow-lg object-cover w-full h-auto"
      />
    </div>

    {/* Teks */}
    <div className="md:w-1/2 text-center md:text-left">
      <h2 className="text-4xl font-bold text-[#B82132] mb-6">About Us</h2>
      <p className="text-gray-700 text-lg leading-relaxed">
        Website ini telah membantu ratusan mahasiswa dan pelaku usaha untuk menemukan peluang
        bisnis dan memperluas jaringan kolaborasi. Kami berkomitmen memberikan platform terbaik
        untuk menghubungkan ide, inovasi, dan eksekusi dalam dunia bisnis.
      </p>
      <p className="mt-4 text-gray-600">
        Bergabunglah bersama kami dan jadikan ide Anda kenyataan melalui dukungan dan kolaborasi
        yang kami fasilitasi.
      </p>
    </div>
  </div>
</section>



      <Footer />
    </section>
  );
};

export default HomePage;
