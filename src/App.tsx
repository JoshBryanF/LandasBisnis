import { Routes, Route } from "react-router"
// import NavBar from "./components/NavBar"
import LoginPage from "./page/LoginPage"
import RegisterPage from "./page/RegisterPage"
import HomePage from "./page/HomePage"
import AboutUsPage from "./page/AboutUsPage"
import ExplorePage from "./page/ExplorePage"
import ContactUsPage from "./page/ContactUsPage"
import StartProjectPage from "./page/StartProjectPage"
import ManagePage from "./page/ManagePage"

import ManageUsersPage from "./page/ManageUsersPage";
import ManageEventsPage from "./page/ManageEventsPage";
import ManageAdminsPage from "./page/ManageAdminsPage";
import ManageStatusPage from "./page/ManageStatusPage";
import ProjectDetailPage from "./page/ProjectDetailPage"
import InvestPage from "./page/InvestPage"
import MentoringEvaluationPage from "./page/MentoringEvaluatingPage"
// import HomePage2 from "./page/HomePage2"
// import createStore from 'react-auth-kit/createStore';
// import AuthProvider from 'react-auth-kit';


function App() {


  return (
    // <AuthProvider store={store}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/contactus" element={<ContactUsPage />} />
        <Route path="/start-project" element={<StartProjectPage />} />
        <Route path="/manage" element={<ManagePage />} />
        <Route path="/explore/:id" element={<ProjectDetailPage />} />
        <Route path="/evaluate" element={<MentoringEvaluationPage />} />
        <Route path="/invest" element={<InvestPage />} />


        <Route path="/manage/users" element={<ManageUsersPage />} />
        <Route path="/manage/events" element={<ManageEventsPage />} />
        <Route path="/manage/admins" element={<ManageAdminsPage />} />
        <Route path="/manage/status" element={<ManageStatusPage />} />
        
      </Routes>
    // </ AuthProvider>
  )
}

export default App
