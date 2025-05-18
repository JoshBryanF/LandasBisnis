import { useNavigate } from "react-router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const ManagePage = () => {
  const navigate = useNavigate();

  const cards = [
    { title: "Manage User", path: "/manage/users", color: "bg-[#B82132]" },
    { title: "Manage Event", path: "/manage/events", color: "bg-[#D2665A]" },
    { title: "Manage Admins", path: "/manage/admins", color: "bg-[#F2B28C]" },
    { title: "Manage Status", path: "/manage/status", color: "bg-[#BDB76B]" },
  ];

  return (
    <div>
        <NavBar/>
        <section className="min-h-screen grid grid-cols-2 grid-rows-2 gap-6 p-6 mt-20">
        {cards.map(({ title, path, color }) => (
            <button
            key={title}
            onClick={() => navigate(path)}
            className={`${color} text-white text-3xl font-bold rounded-lg shadow-lg flex items-center justify-center hover:scale-105 transition-transform`}
            style={{ minHeight: "40vh" }}
            aria-label={title}
            >
            {title}
            </button>
        ))}
        </section>
        <Footer/>
    </div>
  );
};

export default ManagePage;
