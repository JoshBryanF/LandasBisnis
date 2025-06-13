// Example: ManageUsersPage.tsx

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const ManageStatusPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow p-6 mt-20">
        <h1 className="text-3xl font-bold mb-4">Manage Status</h1>
        <p>This is where you'll manage project status maybe?</p>
        {/* TODO: Add user table, actions, etc. */}
      </main>
      <Footer />
    </div>
  );
};

export default ManageStatusPage;
