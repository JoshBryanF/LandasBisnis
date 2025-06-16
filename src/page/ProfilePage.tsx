import { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useAuthUser } from "../auth/auth";
import { Pencil, Camera } from "lucide-react";
import { axiosInstance } from "../lib/axiosInstance";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const ProfilePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const navigate = useNavigate();

  const user = useAuthUser();

  const [form, setForm] = useState({
    name: user?.Name || "",
    email: user?.Email || "",
    password: "",
  });

  const [editing, setEditing] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarChanged, setAvatarChanged] = useState(false); // Controls showing Save/Cancel
  const [avatarFile, setAvatarFile] = useState<File | null>(null); // TODO: implement with backend later

  const [errors, setErrors] = useState<Record<string, string>>({});
  const hasErrors = Object.values(errors).some((e) => e);

  const handleEditClick = (field: keyof typeof editing) => {
    setEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleEditAll = () => {
    setEditing({
      name: true,
      email: true,
      password: false,
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));

    // Live validation
    setErrors(prevErrors => {
      const newErrors = { ...prevErrors };

      if (field === "name") {
        if (!value.trim()) {
          newErrors.name = "Username cannot be empty.";
        } else {
          delete newErrors.name;
        }
        // Optional: validate that the name is unique and is not used by others
      }

      if (field === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors.email = "Enter a valid email address.";
        } else {
          delete newErrors.email;
        }
      }

      if (field === "password") {
        if (value.length < 6) {
          newErrors.password = "Password must be at least 6 characters.";
        } else if (!/[a-zA-Z]/.test(value) || !/[0-9]/.test(value)){
          newErrors.password = "Password must contain both letters and numbers.";
        }
        else {
          delete newErrors.password;
        }
      }

      return newErrors;
    });
  };


  const handleCancel = () => {
    setForm({
      name: user?.Name || "",
      email: user?.Email || "",
      password: "",
    });
    setEditing({
      name: false,
      email: false,
      password: false,
    });
    setAvatarPreview(null);
    setAvatarChanged(false);
    setErrors({});
  };

  const handleSave = () => {
    if (!user) return;

    const updatedData = {
      ...user,
      Name: form.name,
      Email: form.email,
      Password: form.password || user.Password, // preserve existing password if unchanged
    };

    axiosInstance
      .put(`/user/${user.id}`, updatedData)
      .then(() => {
        console.log("Updated successfully!");
        setEditing({ name: false, email: false, password: false });
        setAvatarChanged(false);
      })
      .catch((err) => {
        console.error("Update failed:", err.message);
        setErrors((prev) => ({
          ...prev,
          general: "Failed to update profile. Please try again.",
        }));
      });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file && file.type.startsWith("image/")) {
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
    setAvatarChanged(true);
  } else {
    setErrors((prev) => ({
      ...prev,
      avatar: "Please upload a valid image file.",
    }));
  }
  };


  return (
    <section className="min-h-screen bg-[#F9F9F9]">
      <NavBar />

      <div className="max-w-xl mx-auto px-6 py-16">
        <div className="bg-white shadow-md rounded-2xl p-8 relative">
          <div className="flex flex-col items-center gap-2 relative">
            {/* Avatar Upload */}
            <div className="relative group">
              <img
                src={avatarPreview || "https://i.pravatar.cc/150?img=8"}
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-[#F2B28C]"
              />
              <label className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-70 flex items-center justify-center cursor-pointer transition-opacity">
                <Camera className="w-15 h-15 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>

            {/* Editable Fields */}
            <div className="w-full space-y-6">
              {/* Name */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <label className="text-[#B82132] font-bold text-lg">Username</label>
                  <button onClick={() => handleEditClick("name")} className="hover:text-red-600 cursor-pointer transition-colors">
                    <Pencil className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  disabled={!editing.name}
                  className={`w-full px-4 py-2 border rounded-md ${
                    editing.name
                      ? "bg-white border-gray-400"
                      : "bg-gray-100 border-gray-200 text-gray-500"
                  }`}
                />
                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <label className="text-[#B82132] font-bold text-lg">Email</label>
                  <button onClick={() => handleEditClick("email")} className="hover:text-red-600 cursor-pointer transition-colors">
                    <Pencil className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={!editing.email}
                  className={`w-full px-4 py-2 border rounded-md ${
                    editing.email
                      ? "bg-white border-gray-400"
                      : "bg-gray-100 border-gray-200 text-gray-500"
                  }`}
                />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <label className="text-[#B82132] font-bold text-lg">Password</label>
                  <button onClick={() => navigate("/forgot-password")} className="hover:text-red-600 cursor-pointer transition-colors">
                    <Pencil className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  disabled
                  className="w-full px-4 py-2 border rounded-md bg-gray-100 border-gray-200 text-gray-500"
                />
                {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
              </div>
            </div>

            {/* Role + Permissions */}
            <div className="w-full mt-2">
              <p className="text-gray-600 mb-1">
                <strong>Role:</strong> {user?._t?.join(", ") || "Unknown"}
              </p>
              {user?._t?.includes("Admin") && (
                <>
                  <h3 className="text-[#B82132] font-semibold mt-4 mb-2">Admin Permissions</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {user?.CanManageUsers && <li>Can Manage Users</li>}
                    {user?.CanManageEvents && <li>Can Manage Events</li>}
                    {user?.CanManageStatus && <li>Can Manage Status</li>}
                  </ul>
                </>
              )}
            </div>

            {/* Edit All Button */}
            {!Object.values(editing).some(v => v) && !avatarChanged && (
              <div className="flex justify-end w-full mt-6">
                <button
                  onClick={handleEditAll}
                  className="px-4 py-2 bg-[#B82132] text-white rounded hover:bg-red-600"
                >
                  Edit
                </button>
              </div>
            )}

            {/* Save / Cancel Buttons */}
            {(Object.values(editing).some((v) => v) || avatarChanged) && (
                <div className="flex justify-end w-full mt-6 gap-4">
                <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    disabled={hasErrors}
                    className={`px-4 py-2 rounded-md text-white transition ${
                      hasErrors ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                    }`}
                >
                    Save
                </button>

                </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default ProfilePage;
