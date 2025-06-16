import { Link, useNavigate } from "react-router";
import { useEffect, useState, useRef } from "react";
import { useAuthUser, useSignOut } from "../auth/auth";
// import type { UserType } from "../auth/auth";

type NavBarProps = {
  forceSolidBackground?: boolean;
};

const NavBar = ({ forceSolidBackground = false }: NavBarProps) => {
  const [role, setRole] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const signOut = useSignOut();
  const user = useAuthUser();
  // const isAuthenticated = useIsAuthenticated();
  // console.log(isAuthenticated);
  
  // State untuk navbar visibility dan transparansi
  const [showNav, setShowNav] = useState(true);
  const [isTop, setIsTop] = useState(true);
  
  // Ref untuk menyimpan posisi scroll sebelumnya
  const lastScrollY = useRef(0);
  
  useEffect(() => {
    // const name = authUser.name;
    // console.log(auth.user)
    
    // console.log("NavBar user:", user);
    if (user && user._t && user._t.includes("Admin")) {
      setRole("admin");
    } else if (user && user._t && user._t.includes("Sponsoree")){
      setRole("sponsoree");
    } else if (user && user._t && user._t.includes("Sponsor")){
      setRole("sponsor")
    }

    // if (user && user._t) {
    //   setRole(user._t[1])
    // } else{
    //   console.log("auth tidak ada")
    // }
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

  const [dropdownOpen, setDropdownOpen] = useState(false);


  console.log(role)
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
        forceSolidBackground
          ? "bg-white shadow-none"
          : isTop
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
          <div className="relative group">
            <Link to="/manage" className="text-gray-500 hover:text-[#B82132]">Manage</Link>
          </div>
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
    <div className="relative inline-block text-left">
      <button
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="focus:outline-none"
      >
        <img
          src="https://i.pravatar.cc/150?img=8"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border border-gray-300"
        />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg z-50">
          <Link
            to="/profile"
            className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
            onClick={() => setDropdownOpen(false)}
          >
            Profile
          </Link>
          {role === "sponsoree" ? (
            <>
              <Link
                to={`/explore/${user?.id}`}
                className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                onClick={() => setDropdownOpen(false)}
                >
                My Project
              </Link>
              <Link
                to={`/start-project`}
                className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                onClick={() => setDropdownOpen(false)}
                >
                Start New Project
              </Link>
            </>
            ) : (
              <Link
                to={`/evaluate`}
                className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                onClick={() => setDropdownOpen(false)}
              >
                Evaluate
              </Link>
            )
          }
          <button
            onClick={() => {
              handleLogout();
              setDropdownOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )}
</div>
    </section>
  );
};

export default NavBar;
