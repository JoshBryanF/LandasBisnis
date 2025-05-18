import { Routes, Route } from "react-router"
// import NavBar from "./components/NavBar"
import LoginPage from "./page/LoginPage"
import RegisterPage from "./page/RegisterPage"
import HomePage from "./page/HomePage"
import AboutUsPage from "./page/AboutUsPage"
import ExplorePage from "./page/ExplorePage"
import StartProjectPage from "./page/StartProjectPage"
import ManagePage from "./page/ManagePage"
function App() {


  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/start-project" element={<StartProjectPage />} />
        <Route path="/manage" element={<ManagePage />} />
      </Routes>
    </>
  )
}

export default App
