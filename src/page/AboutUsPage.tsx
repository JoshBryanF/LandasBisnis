import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const AboutUsPage = () => {
    const user = useAuthUser();
    console.log(user)
  return (
    <div>
        <NavBar />
        <section className="min-h-screen bg-white px-6 py-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
            {/* Gambar */}
            <div
            className="w-full md:w-1/2 animate-fadeInLeft"
            >
            <img
                src="images/abtus.jpg"
                alt="About Us Illustration"
                className="rounded-2xl shadow-lg w-full h-auto object-cover"
            />
            </div>

            {/* Teks */}
            <div className="w-full md:w-1/2 animate-fadeInRight">
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
    </div>
  );
};

export default AboutUsPage;
