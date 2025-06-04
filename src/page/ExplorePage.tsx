import { useState, useEffect, useMemo } from "react";
import CardHorizontal from "../components/CardHorizontal";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useFetchProjects } from "../api/useFetchProjects";
import type ProjectResponse from "../api/useFetchProjects";

const categories = ["All", "Technology", "Design", "Education", "Social", "Finance"];

const ExplorePage = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const { projects, fetchProjects } = useFetchProjects();

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    if (!projects) return [];

    let filtered = [...projects];

    // Filter by search
    if (search.trim()) {
      const keyword = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.OrganizationName.toLowerCase().includes(keyword) ||
          p.Description.toLowerCase().includes(keyword)
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.Category === selectedCategory);
    }

    // Sort
    filtered.sort((a, b) =>
      sortOrder === "asc"
        ? a.OrganizationName.localeCompare(b.OrganizationName)
        : b.OrganizationName.localeCompare(a.OrganizationName)
    );

    return filtered;
  }, [projects, search, selectedCategory, sortOrder]);

  return (
    <div>
      <NavBar />

      <section className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="max-w-5xl mx-auto mt-10">
          <h1 className="text-center text-3xl font-bold text-[#B82132] mb-8">Explore Projects</h1>

          {/* Filters */}

<div className="flex flex-col gap-4 items-center mb-10">
  {/* Search Input */}
  <input
    type="text"
    placeholder="Search projects..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full md:max-w-md rounded-full border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#D2665A] text-gray-700"
  />

  {/* Category & Sort */}
  <div className="flex flex-wrap justify-center gap-4">
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="rounded-full border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#D2665A]"
    >
      {categories.map((cat) => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>

    <select
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
      className="rounded-full border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#D2665A]"
    >
      <option value="asc">Sort: A-Z</option>
      <option value="desc">Sort: Z-A</option>
    </select>
  </div>
</div>


          {/* Project List */}
          <div className="space-y-6">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, i) => (
                <div
                  key={project.id}
                  className="opacity-0 animate-[fadeIn_0.4s_ease-out_forwards] transition-transform duration-500"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <CardHorizontal {...project} />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No projects found.</p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ExplorePage;
