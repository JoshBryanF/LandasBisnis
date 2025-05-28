import { useState } from "react";
import { useNavigate } from "react-router";
// import axios from "axios";
import { login } from "../utils/Auth"; // Sesuaikan path ke auth.ts
import { axiosInstance } from "../lib/axiosInstance";

// type Role = "admin" | "user";

type user = {
    email: string;
    password : string
}

export function useLogin() {
//   const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (data : user) => {
    try {
      const response = await axiosInstance.get(`/user`, {
        params: {
          Email: data.email,
          Password: data.password, // Plaintext untuk mock DB
        },
      });

      if (response.data.length > 0) {
        const user = response.data[0];
        const role = user._t.includes("Admin") ? "admin" : "user";

        login(role); // Simpan role ke localStorage
        navigate("/");
      } else {
        setLoginError("Email atau password salah.");
      }
    } catch (err) {
      setLoginError("Terjadi kesalahan saat login.");
    }
  };

  return { handleLogin, loginError };
}
