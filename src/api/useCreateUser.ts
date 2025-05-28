import { useState } from "react";

// import axios from "axios";

// import { AxiosInstance } from "axios";
import { axiosInstance } from "../lib/axiosInstance";

type user = {
    name : string,
    email : string,
    password :string
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
                name : payload.name,
                email : payload.email,
                password : payload.password
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