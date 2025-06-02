import { useState } from "react";

// import axios from "axios";

// import { AxiosInstance } from "axios";
import { axiosInstance } from "../lib/axiosInstance";
// import { getUser } from "../utils/Auth";

type Sponsoree = {
    OrganizationName : string;
    OrganizationAddress : string;
    OrganizationPhoneNumber : string;
    OrganizationEmail: string;
    PersonalPhoneNumber : string;
    PersonalAddress : string;
}

export const useCreateSponsoree = () =>{
    // const [inputText, setInputText] = useState("")
    const [createSponsoreeLoading, setCreateSponsoreeLoading] = useState(false);
    const [createSponsoreeError, setCreateSponsoreeError] = useState("");
    // const user = getUser();
    const handleCreateSponsoree = async (payload : Sponsoree) => {

        try {
            // console.log(user)
            setCreateSponsoreeLoading(true)  
            // end point API untuk Sponsoree  
            await axiosInstance.post(`/user/`, {
                OrganizationName : payload.OrganizationName,
                OrganizationAddress : payload.OrganizationAddress,
                OrganizationPhoneNumber : payload.OrganizationPhoneNumber,
                OrganizationEmail: payload.OrganizationEmail,
                PersonalPhoneNumber : payload.PersonalPhoneNumber,
                PersonalAddress : payload.PersonalAddress
            })
        } catch (error) {
            setCreateSponsoreeError((error as TypeError).message)
        } finally{
            setCreateSponsoreeLoading(false)
            setCreateSponsoreeError("")
        }
    }

    return {
        createSponsoreeLoading,
        createSponsoreeError,
        handleCreateSponsoree
    }
}