import { useState } from "react";
import { useNavigate } from "react-router";
import { axiosInstance } from "../lib/axiosInstance";
import { useSignIn } from "../auth/auth";
// import useAuthUser from "react-auth-kit/hooks/useAuthUser";

// type Role = "admin" | "user";

type user = {
    email: string;
    password : string;
    // token : string;
}

export function useLogin() {
  const signIn = useSignIn();
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (data : user) => {
    try {
      const response = await axiosInstance.get('/user', {
        params: {
          Email: data.email,
          Password: data.password,
        },
      });

      const result = response.data
      console.log(result)
      signIn({
        token : 'test',
        expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        user: result[0]
      })

      navigate('/')
      
    } catch (err) {
      setLoginError(err.message);
    }
    
  };

  return { handleLogin, loginError };
}
