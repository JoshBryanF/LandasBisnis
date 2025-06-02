import { useState } from "react";
import { axiosInstance } from "../lib/axiosInstance";


export type ProjectResponse =  {
    // Name: string;
    // Email : string;
    // Password : string;
    OrganizationName : string;
    OrganizationAddress : string;
    OrganizationPhoneNumber : string;
    OrganizationEmail: string;
    PersonalPhoneNumber : string;
    PersonalAddress : string;
    // age : string;
    id: string;
    _t: string[];
}

export const useFetchProjects = () => {
    const [projects, setProjects] = useState<ProjectResponse[]>([]);
    
    const [projectLoading, setProjectLoading] = useState(false);
    const [projectError, setProjectError] = useState("");
    
    const fetchProjects = async () => {
        try {
            setProjectLoading(true)
            const response = await axiosInstance.get<ProjectResponse[]>("/user");
            const sponsoreeOnly = response.data.filter((item: ProjectResponse) =>
            Array.isArray(item._t) &&
            item._t.includes("User") &&
            item._t.includes("Sponsoree")
            );
            // console.log(sponsoreeOnly)
            // console.log(Array.isArray(response.data)); 
            setProjects(sponsoreeOnly)
        } catch (error) {
            setProjectError((error as TypeError).message)
            console.log(projectError)
            // alert("no")
        } finally{
            setProjectLoading(false)
            // console.log(project)
            setProjectError("")
        }
    }

    return {
        projects, projectLoading, projectError, fetchProjects
    }
}