import { Link, useNavigate } from "react-router";
import { useCreateUser } from "../api/useCreateUser";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import type user

const registerSchema = z.object({
    Name : z.string().min(3).max(20),
    Password: z.string().min(8),
    Email : z.string().email(),
    confirmPassword : z.string().min(8),
    role : z.enum(["Sponsor", "Sponsoree"])
}).refine((data) => data.Password === data.confirmPassword, {
    path: ["confirmPassword"]
  });

type RegisterSchema = z.infer<typeof registerSchema>

const RegisterPage = () => {
    const form = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema)
    })
    const navigate = useNavigate();

    const {createUserLoading, createUserError, handleCreateUser} = useCreateUser();

    const onSubmit = async (data: RegisterSchema) => {
        const { confirmPassword, ...payload } = data;
        handleCreateUser(payload);
        navigate("/")
    }

    return (
        <section className=" min-h-screen flex items-center justify-center">
            <div className="flex rounded-2xl shadow-lg max-w-3xl p-5 items-center relative">
                <button
                onClick={() => navigate("/")}
                className="absolute text-[#B82132] font-semibold hover:text-[#D2665A] transition top-12 left-20"
                aria-label="Go back"
                >
                &#8592; Back
                </button>
                
                <div className="md:w-1/2 px-8 md:px-16">
                <h2 className="font-bold text-2xl text-[#B82132] mt-15">Register</h2>
                <p className="text-xs mt-4 text-[#D2665A]">Create your account to get started</p>

                <form action="" className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <input className="p-2 mt-8 rounded-xl border border-[#F2B28C] focus:outline-none focus:ring-2 focus:ring-[#D2665A]" type="text" placeholder="Full Name" {...form.register("Name")}/>
                    {form.formState.errors.Name  && <p className="mt-1 text-sm text-red-500 bg-red-50 px-3 py-1 rounded">{form.formState.errors.Name.message}</p>}

                    <input className="p-2 rounded-xl border border-[#F2B28C] focus:outline-none focus:ring-2 focus:ring-[#D2665A]" type="email" placeholder="Email" {...form.register("Email")}/>
                    {form.formState.errors.Email && <p className="mt-1 text-sm text-red-500 bg-red-50 px-3 py-1 rounded">{form.formState.errors.Email.message}</p>}
                    

                    
                    <div className="relative">
                    <input className="p-2 rounded-xl border w-full border-[#F2B28C] focus:outline-none focus:ring-2 focus:ring-[#D2665A]" type="password" placeholder="Password" {...form.register("Password")}/>
                    </div>
                    {form.formState.errors.Password && <p className="mt-1 text-sm text-red-500 bg-red-50 px-3 py-1 rounded">{form.formState.errors.Password.message}</p>}


                    <div className="relative">
                    <input className="p-2 rounded-xl border w-full border-[#F2B28C] focus:outline-none focus:ring-2 focus:ring-[#D2665A]" type="password" placeholder="Confirm Password" {...form.register("confirmPassword")}/>
                    </div>
                    {form.formState.errors.confirmPassword && <p className="mt-1 text-sm text-red-500 bg-red-50 px-3 py-1 rounded">{form.formState.errors.confirmPassword.message}</p>}

<label className="block mb-1 text-sm font-medium text-[#B82132]">Choose Role</label>
  {/* <div className="flex gap-4"> */}
    <label className="flex items-center gap-2 text-sm">
      <input
        type="radio"
        value="Sponsor"
        {...form.register("role")}
        className="accent-[#B82132]"
      />
      Sponsor
    </label>
    <label className="flex items-center gap-2 text-sm">
      <input
        type="radio"
        value="Sponsoree"
        {...form.register("role")}
        className="accent-[#B82132]"
      />
      Sponsoree
    </label>
                  <div className="mt-3 text-xs text-[#B82132] flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="accent-[#D2665A] w-4 h-4"
                      required
                    />
                    <label htmlFor="terms" className="flex items-center">
                      I agree to the&nbsp;
                      <Link
                        to="/terms-and-conditions"
                        className="underline text-[#D2665A] hover:text-[#B82132]"
                      >
                        Terms and Conditions
                      </Link>
                    </label>
                  </div>

                    <button className="bg-[#B82132] text-white rounded-xl py-2 hover:bg-[#D2665A] duration-300">Register</button>
                    {createUserLoading && <p className="text-blue-600 text-sm animate-pulse">Loading...</p>}
                    {createUserError && <p className="mt-1 text-sm text-red-500 bg-red-50 px-3 py-1 rounded">Error occured while registering</p> }
                </form>
                  <div className="mt-3 text-xs flex justify-between items-center text-[#B82132]">
                      <p>Already have an account?</p>
                      <Link to="/login" className="py-2 px-5 bg-white border border-[#D2665A] text-[#D2665A] rounded-xl hover:bg-[#F6DED8] duration-300">Login</Link>
                  </div>

                </div>

                <div className="md:block hidden w-1/2">
                <img className="rounded-2xl" src="../../public/images/Login.jpg" />
                </div>
            </div>
        </section>

    )

}


export default RegisterPage;