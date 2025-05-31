import { useState } from "react";
import { useNavigate } from "react-router";
// import axios from "axios";
import { login, type Role } from "../utils/Auth"; // Sesuaikan path ke auth.ts
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
      let role: Role;
      if (response.data.length > 0) {
        const user = response.data[0];
        if (user._t.includes("Admin")) {
          role = "admin";
        } else if (user._t.includes("Sponsor")) {
          role = "sponsor";
        } else if (user._t.includes("Sponsoree")) {
          role = "sponsoree";
        } else {
          throw new Error("Role tidak dikenali");
        }

        login({
          id: user._id,
          name: user.Name,
          email: user.Email,
          role
        });
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
