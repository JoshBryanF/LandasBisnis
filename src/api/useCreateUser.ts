import { useState } from "react";

// import axios from "axios";

// import { AxiosInstance } from "axios";
import { axiosInstance } from "../lib/axiosInstance";

type user = {
    Name : string,
    Email : string,
    Password :string,
    role : string
}

export const useCreateUser = () =>{
    // const [inputText, setInputText] = useState("")
    const [createUserLoading, setCreateUserLoading] = useState(false);
    const [createUserError, setCreateUserError] = useState("");
    const handleCreateUser = async (payload : user) => {

        try {
            setCreateUserLoading(true)  
            // end point API untuk user  
            await axiosInstance.post("/user", {
                Name : payload.Name,
                Email : payload.Email,
                Password : payload.Password,
                _t : ["user", payload.role]
            })
        } catch (error) {
            setCreateUserError((error as TypeError).message)
        } finally{
            setCreateUserLoading(false)
            setCreateUserError("")
        }
    }

    return {
        createUserLoading,
        createUserError,
        handleCreateUser
    }
}