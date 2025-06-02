import { Link, useNavigate } from "react-router";
import { useEffect, useState, useRef } from "react";
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

interface UserData{
  email: string;
  uid : string;
  role : string[];
}

const NavBar = () => {
  const [role, setRole] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const signOut = useSignOut();
  const authUser = useAuthUser<UserData>();
  // console.log(authUser)
  // const user = authUser();
  const isAuthenticated = useIsAuthenticated(); // hasilnya boolean
  console.log(isAuthenticated);
  
  // State untuk navbar visibility dan transparansi
  const [showNav, setShowNav] = useState(true);
  const [isTop, setIsTop] = useState(true);
  
  // Ref untuk menyimpan posisi scroll sebelumnya
  const lastScrollY = useRef(0);
  
  useEffect(() => {
    // const name = authUser.name;
    // console.log(auth.user)
    if(authUser){
      setRole(authUser.role[1]);
    }
    // console.log(authUser)
  }, []);

  // Fungsi untuk handle scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setIsTop(true);
        setShowNav(true);
      } else {
        setIsTop(false);
        if (currentScrollY > lastScrollY.current) {
          setShowNav(false);
        } else {

          setShowNav(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    signOut();
    // setRole(null);
    navigate("/login");
  };


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section
      className={`fixed top-0 left-0 w-full h-16 px-6 flex items-center justify-between transition-all duration-300 z-50
      ${
        isTop
          ? "bg-transparent shadow-none"
          : "bg-white shadow-md"
      }
      ${showNav ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
    >
      <div className="flex items-center gap-4">
        <Link to="/">
          <img src="/images/LandasBisnis-logo2.png" alt="Logo" className="h-8" />
        </Link>
        <Link to="/explore" className="text-gray-500 hover:text-[#B82132]">Explore</Link>
        <Link to="/aboutus" className="text-gray-500 hover:text-[#B82132]">About Us</Link>
        <Link to="/contactus" className="text-gray-500 hover:text-[#B82132]">Contact Us</Link>
        {role === "admin" && (
            <Link to="/manage" className="text-gray-500 hover:text-[#B82132] font-semibold">
            Manage
            </Link>
        )}
      </div>

      <form onSubmit={handleSearch} className="flex-1 mx-10 max-w-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#D2665A] text-gray-500"
        />
      </form>

      <div className="flex items-center gap-2">
  {!role ? (
    <Link
      to="/login"
      className="bg-[#F2B28C] text-[#B82132] px-4 py-2 rounded-xl hover:bg-[#F6DED8] transition text-sm font-medium"
    >
      Login
    </Link>
  ) : (
    <>
      <Link
        to="/start-project"
        className="bg-[#F6DED8] text-[#B82132] px-4 py-2 rounded-xl hover:bg-[#F2B28C] transition text-sm font-medium"
      >
        Start Project
      </Link>
      <button
        onClick={handleLogout}
        className="bg-[#B82132] text-white px-4 py-2 rounded-xl hover:bg-[#D2665A] transition"
      >
        Logout
      </button>
    </>
  )}
</div>
    </section>
  );
};

export default NavBar;
