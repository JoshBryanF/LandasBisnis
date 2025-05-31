// Role yang tersedia
export type Role = "admin" | "sponsor" | "sponsoree";

// Tipe user login yang lengkap
export interface LoggedInUser {
  id: string;
  role: Role;
  name: string;
  email: string;
}

// Simpan user ke localStorage
export function login(user: LoggedInUser) {
  localStorage.setItem("user", JSON.stringify(user));
}

// Logout = hapus user
export function logout() {
  localStorage.removeItem("user");
}

// Ambil user dari localStorage
export function getUser(): LoggedInUser | null {
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
}
