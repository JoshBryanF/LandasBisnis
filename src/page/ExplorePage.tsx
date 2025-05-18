import { useState, useMemo } from "react";
import Card from "../components/Card";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const dummyData = [
  {
    id: "1",
    name: "Business A",
    address: "Jl. Mawar No. 1",
    phone: "0812-3456-7890",
    email: "businessA@example.com",
    description: "Kami menyediakan layanan konsultasi bisnis profesional dan terpercaya untuk pengembangan UMKM.",
    imageUrl: "https://source.unsplash.com/400x300/?office",
  },
  {
    id: "2",
    name: "Business B",
    address: "Jl. Melati No. 2",
    phone: "0821-7654-3210",
    email: "businessB@example.com",
    description: "Spesialis dalam solusi digital marketing dan manajemen media sosial untuk pelaku usaha.",
    imageUrl: "https://source.unsplash.com/400x300/?startup",
  },
  {
    id: "3",
    name: "Business C",
    address: "Jl. Kenanga No. 3",
    phone: "0852-1111-2222",
    email: "businessC@example.com",
    description: "Kami membantu bisnis Anda dengan layanan desain grafis profesional dan brand identity.",
    imageUrl: "https://source.unsplash.com/400x300/?coworking",
  },
  {
    id: "4",
    name: "Business D",
    address: "Jl. Anggrek No. 4",
    phone: "0877-3333-4444",
    email: "businessD@example.com",
    description: "Layanan akuntansi dan keuangan terpercaya untuk bisnis skala kecil dan menengah.",
    imageUrl: "https://source.unsplash.com/400x300/?meeting",
  },
  {
    id: "5",
    name: "Business E",
    address: "Jl. Flamboyan No. 5",
    phone: "0813-5555-6666",
    email: "businessE@example.com",
    description: "Menawarkan pelatihan dan workshop pengembangan diri serta kepemimpinan.",
    imageUrl: "https://source.unsplash.com/400x300/?training",
  },
  {
    id: "6",
    name: "Business F",
    address: "Jl. Cemara No. 6",
    phone: "0896-7777-8888",
    email: "businessF@example.com",
    description: "Kami adalah agensi kreatif yang fokus pada inovasi desain dan user experience.",
    imageUrl: "https://source.unsplash.com/400x300/?creative",
  },
  {
    id: "7",
    name: "Business G",
    address: "Jl. Sakura No. 7",
    phone: "0838-9999-0000",
    email: "businessG@example.com",
    description: "Platform marketplace lokal untuk produk-produk handmade dan kerajinan asli Indonesia.",
    imageUrl: "https://source.unsplash.com/400x300/?market",
  },
  {
    id: "8",
    name: "Business H",
    address: "Jl. Teratai No. 8",
    phone: "0819-1234-5678",
    email: "businessH@example.com",
    description: "Konsultan teknologi dan pengembangan software custom untuk bisnis digital.",
    imageUrl: "https://source.unsplash.com/400x300/?technology",
  },
];

// const categories = ["All", "Consulting", "Marketing", "Design", "Finance", "Training"];

const ExplorePage = () => {
    <NavBar/>
  const [search, setSearch] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredProjects = useMemo(() => {
    let projects = dummyData;



    if (search.trim()) {
      const lowerSearch = search.toLowerCase();
      projects = projects.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerSearch) ||
          p.description.toLowerCase().includes(lowerSearch)
      );
    }

    projects = projects.sort((a, b) => {
      if (sortOrder === "asc") return a.name.localeCompare(b.name);
      else return b.name.localeCompare(a.name);
    });

    return projects;
  }, []);

  return (
    <div>
        <NavBar/>
        <section className="min-h-screen bg-gray-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-center text-4xl font-bold text-[#B82132] mb-10">Explore Projects</h1>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full max-w-md rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D2665A] shadow-sm text-gray-700"
            />


            <select
                className="rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D2665A] shadow-sm"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            >
                <option value="asc">Sort: A-Z</option>
                <option value="desc">Sort: Z-A</option>
            </select>
            </div>

            {/* Projects grid */}
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProjects.length > 0 ? (
                filteredProjects.map((project, i) => (
                <div
                    key={project.id}
                    className="opacity-0 translate-y-4 animate-[fadeIn_0.5s_ease-out_forwards] transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-lg"
                    style={{ animationDelay: `${i * 100}ms` }}
                >
                    <Card {...project} />
                </div>
                ))
            ) : (
                <p className="text-center text-gray-500 col-span-full mt-10">No projects found.</p>
            )}
            </div>
        </div>
        
        </section>
        <Footer/>
    </div>
  );
};

export default ExplorePage;
