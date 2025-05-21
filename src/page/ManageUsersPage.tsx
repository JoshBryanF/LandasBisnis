import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useState, useMemo } from "react";
import { FiChevronUp, FiChevronDown, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

const mockUsers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "user" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "admin" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "user" },
  { id: 4, name: "Daisy Ridley", email: "daisy@example.com", role: "admin" },
  { id: 5, name: "Ethan Hunt", email: "ethan@example.com", role: "user" },
  { id: 6, name: "Fiona Glenanne", email: "fiona@example.com", role: "user" },
  { id: 7, name: "George Lucas", email: "george@example.com", role: "admin" },
];

type SortKey = "name" | "email" | "role";
type SortDirection = "asc" | "desc";

const ManageUsersPage = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({ key: "name", direction: "asc" });
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const handleSort = (key: SortKey) => {
    setSortConfig(prev =>
      prev.key === key ? { key, direction: prev.direction === "asc" ? "desc" : "asc" } : { key, direction: "asc" }
    );
  };

  const filteredAndSortedUsers = useMemo(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
      const valA = a[sortConfig.key].toString().toLowerCase();
      const valB = b[sortConfig.key].toString().toLowerCase();

      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [users, searchQuery, sortConfig]);

  const totalPages = Math.ceil(filteredAndSortedUsers.length / usersPerPage);
  const paginatedUsers = filteredAndSortedUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const selectedUser = users.find(user => user.id === selectedUserId);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow p-8 mt-20 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          {/* Header with Search */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <h1 className="text-3xl font-bold">Manage Users</h1>
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="border px-4 py-2 rounded w-full md:w-80 shadow-sm"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  {["name", "email", "role"].map(key => {
                    const k = key as SortKey;
                    const isActive = sortConfig.key === k;
                    return (
                      <th key={k} className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort(k)}>
                        <div className="flex items-center gap-1">
                          {k.charAt(0).toUpperCase() + k.slice(1)}
                          {sortConfig.direction === "asc" && <FiChevronUp color={isActive ? "#EF4444" : "#9CA3AF"} />}
                          {sortConfig.direction === "desc" && <FiChevronDown color={isActive ? "#EF4444" : "#9CA3AF"} />}
                        </div>
                      </th>
                    );
                  })}
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map(user => (
                  <tr key={user.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2 capitalize">{user.role}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => setSelectedUserId(user.id)}
                        className="px-3 py-1 rounded text-white"
                        style={{ backgroundColor: "#6366F1" }}
                      >
                        <FiEye className="inline mr-1" /> View
                      </button>
                      <button
                        onClick={() => console.log("Edit user", user.id)}
                        className="px-3 py-1 rounded text-white"
                        style={{ backgroundColor: "#6366F1" }}
                      >
                        <FiEdit className="inline mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => setUsers(users.filter(u => u.id !== user.id))}
                        className="px-3 py-1 rounded text-white"
                        style={{ backgroundColor: "#EF4444" }}
                      >
                        <FiTrash2 className="inline mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {paginatedUsers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-1 text-white rounded disabled:opacity-50"
                style={{ backgroundColor: "#6366F1" }}
              >
                Prev
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-1 text-white rounded disabled:opacity-50"
                style={{ backgroundColor: "#6366F1" }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4">User Details</h2>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Role:</strong> {selectedUser.role}</p>
            <button
              onClick={() => setSelectedUserId(null)}
              className="absolute top-2 right-2 text-sm text-white px-3 py-1 rounded"
              style={{ backgroundColor: "#EF4444" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsersPage;
