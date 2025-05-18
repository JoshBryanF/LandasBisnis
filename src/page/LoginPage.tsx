import { Link, useNavigate } from "react-router";


const LoginPage = () => {
    const navigate = useNavigate();
    return (
        <section className=" min-h-screen flex items-center justify-center">
            <div className="flex rounded-1xl shadow-lg max-w-3xl p-5 items-center relative">
                <button
                onClick={() => navigate("/")}
                className="absolute text-[#B82132] font-semibold hover:text-[#D2665A] transition top-12 left-20"
                aria-label="Go back"
                >
                &#8592; Back
                </button>
                <div className="md:w-1/2 px-8 md:px-16">
                    {/* <Link>back</Link> */}
                    <h2 className="font-bold text-2xl text-[#B82132]">Login</h2>
                    <p className="text-xs mt-4 text-[#B82132]">Log in if you already have an account</p>

                    <form action="" className="flex flex-col gap-4">
                        <input className="p-2 mt-8 rounded-xl border border-[#F2B28C]" type="email" name="email" placeholder="Email" />
                        
                        <div className="relative">
                        <input className="p-2 rounded-xl border border-[#F2B28C] w-full" type="password" name="password" placeholder="Password" />
                        </div>
                        <button className="bg-[#B82132] rounded-xl text-white py-2 hover:bg-[#F6DED8] duration-300">Login</button>
                    </form>

                    

                    <div className="mt-5 text-xs border-b border-[#B82132] py-4 text-[#B82132]">
                        <a href="#">Forgot your password?</a>
                    </div>

                    <div className="mt-3 text-xs flex justify-between items-center text-[#B82132]">
                        <p>Don't have an account?</p>
                        <Link to="/register" className="py-2 px-5 bg-white border rounded-xl hover:bg-[#F6DED8] duration-300">Register</Link>
                    </div>
                </div>


                <div className="md:block hidden w-1/2">
                    <img className="rounded-2xl" src="../../public/images/Login.jpg" />
                </div>
            </div>
        </section>
    )
}

export default LoginPage;