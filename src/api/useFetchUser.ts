import { useState } from "react";
import { axiosInstance } from "../lib/axiosInstance";


export type UserResponse =  {
    id: string;
    Name: string;
    Email : string;
    Password : string;
    // OrganizationName : string;
    // OrganizationAddress : string;
    // OrganizationPhoneNumber : string;
    // OrganizationEmail: string;
    // PersonalPhoneNumber : string;
    // PersonalAddress : string;
    // age : string;
    // id: string;
    _t: string[];
    // Goals: string;
    // Description : string;
}

export const useFetchUser = () => {
    const [users, setUsers] = useState<UserResponse[]>([]);
    
    const [userLoading, setUserLoading] = useState(false);
    const [userError, setUserError] = useState("");
    
    const fetchUsers = async () => {
        try {
            setUserLoading(true)
            const response = await axiosInstance.get<UserResponse[]>("/user");
            const sponsoreeOnly = response.data.filter((item: UserResponse) =>
            Array.isArray(item._t) &&
            item._t.includes("User") &&
            item._t.includes("Sponsoree")
            );
            // console.log(sponsoreeOnly)
            // console.log(Array.isArray(response.data)); 
            setUsers(sponsoreeOnly)
        } catch (error) {
            setUserError((error as TypeError).message)
            console.log(userError)
            // alert("no")
        } finally{
            setUserLoading(false)
            // console.log(user)
            setUserError("")
        }
    }

    return {
        users, userLoading, userError, fetchUsers
    }
}