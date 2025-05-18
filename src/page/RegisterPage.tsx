import { Link, useNavigate } from "react-router";

const RegisterPage = () => {
    const navigate = useNavigate();

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
                <h2 className="font-bold text-2xl text-[#B82132]">Register</h2>
                <p className="text-xs mt-4 text-[#D2665A]">Create your account to get started</p>

                <form action="" className="flex flex-col gap-4">
                    <input className="p-2 mt-8 rounded-xl border border-[#F2B28C] focus:outline-none focus:ring-2 focus:ring-[#D2665A]" type="text" name="name" placeholder="Full Name" />
                    <input className="p-2 rounded-xl border border-[#F2B28C] focus:outline-none focus:ring-2 focus:ring-[#D2665A]" type="email" name="email" placeholder="Email" />
                    
                    <div className="relative">
                    <input className="p-2 rounded-xl border w-full border-[#F2B28C] focus:outline-none focus:ring-2 focus:ring-[#D2665A]" type="password" name="password" placeholder="Password" />
                    </div>

                    <div className="relative">
                    <input className="p-2 rounded-xl border w-full border-[#F2B28C] focus:outline-none focus:ring-2 focus:ring-[#D2665A]" type="password" name="confirmPassword" placeholder="Confirm Password" />
                    </div>

                    <button className="bg-[#B82132] text-white rounded-xl py-2 hover:bg-[#D2665A] duration-300">Register</button>
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