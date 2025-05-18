// Tipe untuk role
type Role = "admin" | "user";

export interface User {
  role: Role;
}

// Simpan user ke localStorage
export function login(role: Role) {
  const user: User = { role };
  localStorage.setItem("user", JSON.stringify(user));
}

// Logout = hapus user
export function logout() {
  localStorage.removeItem("user");
}

// Ambil user dari localStorage
export function getUser(): User | null {
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
}
