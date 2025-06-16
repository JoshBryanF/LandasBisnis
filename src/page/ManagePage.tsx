// src/pages/ManagePage.tsx
import React, { useState, useEffect, useMemo } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { axiosInstance } from "../lib/axiosInstance";
import {
  ChevronUp,
  ChevronDown,
  Eye,
  Edit2,
  Trash2,
} from "lucide-react";

type RawUser = {
  id: string;
  Name: string;
  Email: string;
  Password: string;
  _t: string[];
};
type RawAdmin = RawUser & {
  CanManageAdmins: boolean;
  CanManageUsers: boolean;
  CanManageEvents: boolean;
  CanManageStatus: boolean;
};
type RawProject = RawUser & {
  OrganizationName: string;
  OrganizationAddress: string;
  OrganizationPhoneNumber: string;
  OrganizationEmail: string;
  PersonalPhoneNumber: string;
  PersonalAddress: string;
  Goals: string;
  Description: string;
  Status: "Proposed" | "Accepted" | "Rejected";
};

type SortKey = "Name" | "Email" | "OrganizationName" | "Status";
type SortDirection = "asc" | "desc";
type Tab = "users" | "admins" | "projects";

export default function ManagePage() {
  const [data, setData] = useState<Array<RawUser | RawAdmin | RawProject>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("users");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: SortDirection;
  }>({ key: "Name", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>({});

  // fetch all
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/user")
      .then(res => setData(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // open view or new
  const openView = (item: any) => {
    setCurrentItem({ ...item });
    setEditing(false);
    setModalOpen(true);
  };
  const openCreate = () => {
    let blank: any = { Name: "", Email: "", Password: "" };
    if (tab === "admins") {
      blank = {
        ...blank,
        CanManageAdmins: false,
        CanManageUsers: false,
        CanManageEvents: false,
        CanManageStatus: false,
      };
    } else if (tab === "projects") {
      blank = {
        ...blank,
        OrganizationName: "",
        OrganizationAddress: "",
        OrganizationPhoneNumber: "",
        OrganizationEmail: "",
        PersonalPhoneNumber: "",
        PersonalAddress: "",
        Goals: "",
        Description: "",
        Status: "Proposed",
      };
    }
    setCurrentItem(blank);
    setEditing(true);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(false);
    setCurrentItem({});
  };

  const saveItem = () => {
    const isNew = !currentItem.id;
    const url = isNew ? "/user" : `/user/${currentItem.id}`;
    const method = isNew ? axiosInstance.post : axiosInstance.put;
    method(url, currentItem)
      .then(() => axiosInstance.get("/user"))
      .then(res => {
        setData(res.data);
        closeModal();
      })
      .catch(err => setError(err.message));
  };

  // filter by tab
  const filteredByTab = useMemo(() => {
    return data.filter(u => {
      if (tab === "admins") return u._t.includes("Admin");
      if (tab === "projects") return u._t.includes("Sponsoree");
      return u._t.includes("User") || u._t.includes("Sponsoree");
    });
  }, [data, tab]);

  useEffect(() => {
    if (tab !== "projects") {
      setStatusFilter("All");
    }
  }, [tab]);

  // search + sort
  const filteredAndSorted = useMemo(() => {
    const filtered = filteredByTab.filter(item => {
      const hay =
        tab === "projects"
          ? `${item.Name}${item.Email}${(item as RawProject).OrganizationName}${(item as RawProject).Status}`
          : `${item.Name}${item.Email}`;

      const matchesSearch = hay
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesStatus =
        tab !== "projects" ||
        statusFilter === "All" ||
        (item as RawProject).Status === statusFilter;

      return matchesSearch && matchesStatus;
    });
    return filtered.sort((a, b) => {
      const aV = ((a as any)[sortConfig.key] || "")
        .toString()
        .toLowerCase();
      const bV = ((b as any)[sortConfig.key] || "")
        .toString()
        .toLowerCase();
      if (aV < bV) return sortConfig.direction === "asc" ? -1 : 1;
      if (aV > bV) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredByTab, searchQuery, sortConfig, tab, statusFilter]);

  // pagination
  const totalPages = Math.ceil(filteredAndSorted.length / perPage);
  const pageItems = filteredAndSorted.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handleSort = (key: SortKey) => {
    setSortConfig(prev =>
      prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow mt-20 flex">
        {/* Sidebar */}
        <nav className="w-48 bg-white border-r shadow-sm">
          <ul>
            {(
              [
                { key: "users", label: "Users" },
                { key: "admins", label: "Admins" },
                { key: "projects", label: "Projects" },
              ] as { key: Tab; label: string }[]
            ).map(t => (
              <li key={t.key}>
                <button
                  onClick={() => {
                    setTab(t.key);
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className={`block w-full text-left px-4 py-3 hover:bg-gray-100 ${
                    tab === t.key ? "bg-gray-100 font-semibold" : ""
                  }`}
                >
                  {t.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content */}
        <section className="flex-1 p-8">
          {/* Header + New */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Management
            </h1>
            <button
              onClick={openCreate}
              className="px-4 py-2 bg-[#B82132] text-white rounded hover:bg-red-600"
            >
              New {tab === "projects" ? "Project" : "User"}
            </button>
          </div>

          {/* Search & Chips */}
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 border px-4 py-2 rounded focus:ring focus:ring-[#B82132]"
            />
            {tab === "projects" && (
              <div className="flex gap-2">
                {["All", "Proposed", "Accepted", "Rejected"].map(status => (
                  <button
                    key={status}
                    onClick={() => {
                      setStatusFilter(status)
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1 border-2 rounded-full text-sm ${
                      statusFilter === status ? "bg-red-200 font-semibold border-[#B82132] hover:bg-red-100" : "border-gray-500 font-semibold hover:bg-gray-100"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  {(["Name", "Email"] as SortKey[])
                    .concat(
                      tab === "projects"
                        ? (["OrganizationName", "Status"] as SortKey[])
                        : []
                    )
                    .map(key => (
                      <th
                        key={key}
                        onClick={() => handleSort(key)}
                        className="px-4 py-2 cursor-pointer text-left"
                      >
                        <div className="flex items-center gap-1">
                          {key === "OrganizationName" ? "Organization" : key}
                          <ChevronUp
                            size={14}
                            color={
                              sortConfig.key === key &&
                              sortConfig.direction === "asc"
                                ? "#B82132"
                                : "#9CA3AF"
                            }
                          />
                          <ChevronDown
                            size={14}
                            color={
                              sortConfig.key === key &&
                              sortConfig.direction === "desc"
                                ? "#B82132"
                                : "#9CA3AF"
                            }
                          />
                        </div>
                      </th>
                    ))}
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map(item => (
                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-4 py-2">{item.Name}</td>
                    <td className="px-4 py-2">{item.Email}</td>
                    {tab === "projects" && (
                      <>
                        <td className="px-4 py-2">
                          {(item as RawProject).OrganizationName}
                        </td>
                        <td className="px-4 py-2">
                          {(item as RawProject).Status || "Proposed"}
                        </td>
                      </>
                    )}
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => openView(item)}
                        className="inline-flex items-center px-3 py-1 text-white bg-[#B82132] rounded text-sm hover:bg-red-600"
                      >
                        <Eye className="mr-1" size={16} /> View
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this entry?")) {
                            axiosInstance
                              .delete(`/user/${item.id}`)
                              .then(() => axiosInstance.get("/user"))
                              .then(res => setData(res.data))
                              .catch(err => setError(err.message));
                          }
                        }}
                        className="inline-flex items-center px-3 py-1 text-sm text-white bg-gray-600 rounded hover:bg-gray-700"
                      >
                        <Trash2 className="mr-1" size={16} /> Delete
                      </button>
                      {tab === "projects" && (
                        <div className="inline-flex items-center">
                          {/* <label className="mr-1 text-sm">Change Status:</label> */}
                          <select
                            defaultValue=""
                            onChange={e => {
                              const newStatus = e.target.value;
                              if (!newStatus) return;
                              axiosInstance
                                .put(`/user/${(item as RawProject).id}`, {
                                  ...item,
                                  Status: newStatus,
                                })
                                .then(() => axiosInstance.get("/user"))
                                .then(res => setData(res.data))
                                .catch(err => setError(err.message));
                            }}
                            className="text-sm border px-2 py-1 rounded"
                          >
                            <option value="" disabled>Change Status</option>
                            <option value="Proposed">Proposed</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {pageItems.length === 0 && (
                  <tr>
                    <td
                      colSpan={tab === "projects" ? 5 : 3}
                      className="py-4 text-center text-gray-500"
                    >
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() =>
                setCurrentPage(p => Math.max(p - 1, 1))
              }
              disabled={currentPage === 1}
              className="px-4 py-1 rounded border disabled:opacity-50 hover:bg-gray-100"
            >
              Prev
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage(p => Math.min(p + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-1 rounded border disabled:opacity-50 hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </section>
      </main>

      <Footer />

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Close */}
            {/* <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button> */}

            <div className="sticky top-0 z-10 bg-white pt-4 pb-4 mb-4 border-b border-gray-200 shadow-sm">
              <div className="flex justify-between items-center px-6">
                <h2 className="text-xl font-semibold">
                  {editing
                    ? currentItem.id
                      ? "Edit Entry"
                      : "New Entry"
                    : "Details"}
                </h2>
                <div className="flex gap-2 items-center">
                  {editing ? (
                    <>
                      <button
                        onClick={() => setEditing(false)}
                        className="px-4 py-2 border rounded hover:bg-gray-100 text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={saveItem}
                        className="px-4 py-2 bg-[#B82132] text-white rounded hover:bg-red-600 text-sm"
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setEditing(true)}
                      className="px-4 py-2 gap-2 bg-[#B82132] text-white rounded hover:bg-red-600 text-sm inline-flex items-center"
                    >
                      <Edit2 className="mr-1" size={16} /> Edit
                    </button>
                  )}
                  <button
                    onClick={closeModal}
                    className="pl-4 text-gray-500 hover:text-gray-800 text-lg"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>

            {/* Form fields */}
            <div className="space-y-4 px-6 pb-6">
              {/* Name */}
              <div>
                <label className="block font-bold text-[#B82132] mb-1">
                  Name
                </label>
                <input
                  value={currentItem.Name || ""}
                  disabled={!editing}
                  onChange={e =>
                    setCurrentItem((c: any) => ({
                      ...c,
                      Name: e.target.value,
                    }))
                  }
                  className={`w-full border px-3 py-2 rounded ${
                    editing ? "" : "bg-gray-100"
                  }`}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-bold text-[#B82132] mb-1">
                  Email
                </label>
                <input
                  value={currentItem.Email || ""}
                  disabled={!editing}
                  onChange={e =>
                    setCurrentItem((c: any) => ({
                      ...c,
                      Email: e.target.value,
                    }))
                  }
                  className={`w-full border px-3 py-2 rounded ${
                    editing ? "" : "bg-gray-100"
                  }`}
                />
              </div>

              {/* Password for users/admins */}
              {(tab === "users" || tab === "admins") && (
                <div>
                  <label className="block font-bold text-[#B82132] mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={currentItem.Password || ""}
                    disabled={!editing}
                    onChange={e =>
                      setCurrentItem((c: any) => ({
                        ...c,
                        Password: e.target.value,
                      }))
                    }
                    className={`w-full border px-3 py-2 rounded ${
                      editing ? "" : "bg-gray-100"
                    }`}
                  />
                </div>
              )}

              {/* Admin permissions */}
              {tab === "admins" && (
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {[
                    ["CanManageAdmins", "Manage Admins"],
                    ["CanManageUsers", "Manage Users"],
                    ["CanManageEvents", "Manage Events"],
                    ["CanManageStatus", "Manage Status"],
                  ].map(([key, label]) => (
                    <label
                      key={key}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        checked={!!currentItem[key]}
                        disabled={!editing}
                        onChange={e =>
                          setCurrentItem((c: any) => ({
                            ...c,
                            [key]: e.target.checked,
                          }))
                        }
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Project fields */}
              {tab === "projects" && (
                <>
                  <div>
                    <label className="block font-bold text-[#B82132] mb-1">
                      Organization Name
                    </label>
                    <input
                      value={currentItem.OrganizationName || ""}
                      disabled={!editing}
                      onChange={e =>
                        setCurrentItem((c: any) => ({
                          ...c,
                          OrganizationName: e.target.value,
                        }))
                      }
                      className={`w-full border px-3 py-2 rounded ${
                        editing ? "" : "bg-gray-100"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#B82132] mb-1">
                      Organization Address
                    </label>
                    <input
                      value={currentItem.OrganizationAddress || ""}
                      disabled={!editing}
                      onChange={e =>
                        setCurrentItem((c: any) => ({
                          ...c,
                          OrganizationAddress: e.target.value,
                        }))
                      }
                      className={`w-full border px-3 py-2 rounded ${
                        editing ? "" : "bg-gray-100"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#B82132] mb-1">
                      Organization Phone
                    </label>
                    <input
                      value={currentItem.OrganizationPhoneNumber || ""}
                      disabled={!editing}
                      onChange={e =>
                        setCurrentItem((c: any) => ({
                          ...c,
                          OrganizationPhoneNumber: e.target.value,
                        }))
                      }
                      className={`w-full border px-3 py-2 rounded ${
                        editing ? "" : "bg-gray-100"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#B82132] mb-1">
                      Organization Email
                    </label>
                    <input
                      value={currentItem.OrganizationEmail || ""}
                      disabled={!editing}
                      onChange={e =>
                        setCurrentItem((c: any) => ({
                          ...c,
                          OrganizationEmail: e.target.value,
                        }))
                      }
                      className={`w-full border px-3 py-2 rounded ${
                        editing ? "" : "bg-gray-100"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#B82132] mb-1">
                      Personal Phone
                    </label>
                    <input
                      value={currentItem.PersonalPhoneNumber || ""}
                      disabled={!editing}
                      onChange={e =>
                        setCurrentItem((c: any) => ({
                          ...c,
                          PersonalPhoneNumber: e.target.value,
                        }))
                      }
                      className={`w-full border px-3 py-2 rounded ${
                        editing ? "" : "bg-gray-100"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#B82132] mb-1">
                      Personal Address
                    </label>
                    <input
                      value={currentItem.PersonalAddress || ""}
                      disabled={!editing}
                      onChange={e =>
                        setCurrentItem((c: any) => ({
                          ...c,
                          PersonalAddress: e.target.value,
                        }))
                      }
                      className={`w-full border px-3 py-2 rounded ${
                        editing ? "" : "bg-gray-100"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#B82132] mb-1">
                      Goals
                    </label>
                    <input
                      type="text"
                      placeholder="Rp.0,00"
                      value={currentItem.Goals || ""}
                      disabled={!editing}
                      onChange={e =>
                        setCurrentItem((c: any) => ({
                          ...c,
                          Goals: e.target.value,
                        }))
                      }
                      className={`w-full border px-3 py-2 rounded ${
                        editing ? "" : "bg-gray-100"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#B82132] mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={currentItem.Description || ""}
                      disabled={!editing}
                      onChange={e =>
                        setCurrentItem((c: any) => ({
                          ...c,
                          Description: e.target.value,
                        }))
                      }
                      className={`w-full border px-3 py-2 rounded ${
                        editing ? "" : "bg-gray-100"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#B82132] mb-1">
                      Status
                    </label>
                    {editing ? (
                      <select
                        value={currentItem.Status}
                        onChange={e =>
                          setCurrentItem((c: any) => ({
                            ...c,
                            Status: e.target.value,
                          }))
                        }
                        className="w-full border px-3 py-2 rounded"
                      >
                        <option>Proposed</option>
                        <option>Accepted</option>
                        <option>Rejected</option>
                      </select>
                    ) : (
                      <div className="px-3 py-2 border rounded bg-gray-100">
                        {currentItem.Status || "Proposed"}
                      </div>
                    )}
                  </div>
                </>
              )}

            </div>

            {/* Modal actions */}
            {/* <div className="mt-6 flex justify-end space-x-2">
              {editing ? (
                <>
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveItem}
                    className="px-4 py-2 bg-[#B82132] text-white rounded hover:bg-red-600"
                  >
                    Save
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="px-4 py-2 bg-[#B82132] text-white rounded hover:bg-red-600 inline-flex items-center"
                >
                  <Edit2 className="mr-1" size={16} /> Edit
                </button>
              )}
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
