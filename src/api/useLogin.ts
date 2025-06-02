import { useState } from "react";
import { useNavigate } from "react-router";
import { axiosInstance } from "../lib/axiosInstance";
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
// import useAuthUser from "react-auth-kit/hooks/useAuthUser";

// type Role = "admin" | "user";

type user = {
    email: string;
    password : string;
    // token : string;
}

export function useLogin() {
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const signIn = useSignIn();

  const handleLogin = async (data : user) => {
    try {
      const response = await axiosInstance.get('/user', {
        params: {
          Email: data.email,
          Password: data.password,
        },
      });

      const result = response.data
      console.log(result);
      signIn({
        auth: {
          token: 'test',
          type: 'Bearer',
          
        },
        userState: result.authUserState
      });
      navigate('/aboutus')
      // const succeed =   
      // const succeed = signIn({
      //   auth: {
      //     token: 'test',
      //     type: 'Bearer',
          
      //   },
      //   userState: {
      //     email: result.email,
      //     uid: result.id,
      //     role: result._t,
      //   },
      // });

      // if (succeed) {
      //   navigate('/aboutus');
      // } else {
      //   setLoginError("Wrong Email or Password");
      // }
    } catch (err) {
      setLoginError(err.message);
    }
    
  };
  const user = useAuthUser();
  console.log(user)

  return { handleLogin, loginError };
}
