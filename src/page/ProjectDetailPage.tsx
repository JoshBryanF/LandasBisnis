import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useAuthUser } from "../auth/auth";
import type { ProjectResponse } from "../api/useFetchProjects";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { axiosInstance } from "../lib/axiosInstance";

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const user = useAuthUser();

  const [project, setProject] = useState<ProjectResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [formStep, setFormStep] = useState(0);

  // Form fields
  const [updateNote, setUpdateNote] = useState("");
  const [progressReport, setProgressReport] = useState("");
  const [progressPercent, setProgressPercent] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [fundUsage, setFundUsage] = useState("");
  const [challenges, setChallenges] = useState("");
  const [supportNeeded, setSupportNeeded] = useState("");
  const [returnInfo, setReturnInfo] = useState({
    financial: "",
    nonFinancial: ""
  });

  useEffect(() => {
    axiosInstance.get(`/user/${id}`)
      .then(response => {
        setProject(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Fetch error:", error);
        setLoading(false);
      });
  }, [id]);

  const isOwner = user?.id === project?.id;

  const handleNext = () => {
    setFormStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setFormStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("updateNote", updateNote);
    formData.append("progressReport", progressReport);
    formData.append("progressPercent", progressPercent.toString());
    formData.append("fundUsage", fundUsage);
    formData.append("challenges", challenges);
    formData.append("supportNeeded", supportNeeded);
    formData.append("returnFinancial", returnInfo.financial);
    formData.append("returnNonFinancial", returnInfo.nonFinancial);
    if (file) {
      formData.append("file", file);
    }

    // Contoh submit via axios POST (sesuaikan endpoint dan method backend)
    axiosInstance.post(`/projects/${id}/update`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    .then(() => {
      alert("Project update submitted!");
      setFormStep(0);
      // reset form jika perlu
    })
    .catch((error) => {
      console.error("Submit error:", error);
      alert("Failed to submit update.");
    });
  };

  if (loading) return <p className="p-4 text-center">Loading...</p>;
  if (!project) return <p className="p-4 text-center">Project not found.</p>;

  return (
    <div>
      <NavBar />
      <section className="max-w-5xl mx-auto py-16 px-4">
        <img
          src="/images/banner.jpg"
          alt={project.OrganizationName}
          className="rounded-xl w-full h-64 object-cover mb-8"
        />
        <h1 className="text-3xl font-bold text-[#B82132] mb-2">
          {project.OrganizationName}
        </h1>
        <p className="text-gray-700 mb-4">{project.Description}</p>
        <p className="text-gray-600 text-sm mb-2">
          Address: {project.OrganizationAddress}
        </p>
        <p className="text-gray-600 text-sm mb-2">
          Email: {project.OrganizationEmail}
        </p>
        <p className="text-gray-600 text-sm mb-2">
          Phone: {project.OrganizationPhoneNumber}
        </p>
        <p className="text-gray-700 font-semibold mb-4">Goal: {project.Goals}</p>

        {!isOwner && (
          <div className="mt-8 p-6 border rounded-lg shadow bg-white">
            <h2 className="text-xl font-semibold mb-4 text-[#B82132]">Support This Project</h2>

            <label className="block mb-2 font-medium">Send a message to the organization:</label>
            <textarea
              className="w-full border rounded p-2"
              rows={4}
              placeholder="Write your message here..."
            />
            <Link to={'/invest'} className="mt-4 bg-[#B82132] text-white px-4 py-2 rounded inline-block">
              Invest
            </Link>
          </div>
        )}

        {isOwner && (
          <div className="mt-8 p-6 border rounded-lg shadow bg-white">
            <h2 className="text-xl font-semibold mb-4">Edit Project</h2>

            {formStep === 0 && (
              <div>
                <label className="block mb-2 font-medium">Update Note:</label>
                <textarea
                  className="w-full border rounded p-2"
                  rows={4}
                  value={updateNote}
                  onChange={(e) => setUpdateNote(e.target.value)}
                  placeholder="Describe recent updates on your project"
                />
                <div className="mt-4 text-right">
                  <button
                    onClick={handleNext}
                    className="bg-[#B82132] text-white px-4 py-2 rounded hover:bg-[#9f1b29]"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {formStep === 1 && (
              <div>
                <label className="block mb-2 font-medium">Progress Report:</label>
                <textarea
                  className="w-full border rounded p-2 mb-4"
                  rows={4}
                  value={progressReport}
                  onChange={(e) => setProgressReport(e.target.value)}
                  placeholder="Explain recent progress made"
                />

                <label className="block mb-2 font-medium">Progress (%):</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={progressPercent}
                  onChange={(e) => setProgressPercent(Number(e.target.value))}
                  className="w-full border rounded p-2 mb-4"
                />

                <label className="block mb-2 font-medium">File Upload (e.g. report, photo):</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full border rounded p-2 mb-4"
                />

                <div className="mt-4 flex justify-between">
                  <button
                    onClick={handleBack}
                    className="bg-gray-300 px-4 py-2 rounded"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="bg-[#B82132] text-white px-4 py-2 rounded hover:bg-[#9f1b29]"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {formStep === 2 && (
              <div>
                <label className="block mb-2 font-medium">Return (Financial):</label>
                <input
                  type="text"
                  className="w-full border rounded p-2 mb-4"
                  value={returnInfo.financial}
                  onChange={(e) =>
                    setReturnInfo({ ...returnInfo, financial: e.target.value })
                  }
                  placeholder="What financial returns can investors expect?"
                />

                <label className="block mb-2 font-medium">Return (Non-Financial):</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={returnInfo.nonFinancial}
                  onChange={(e) =>
                    setReturnInfo({ ...returnInfo, nonFinancial: e.target.value })
                  }
                  placeholder="What non-financial impacts are expected?"
                />

                <div className="mt-4 flex justify-between">
                  <button
                    onClick={handleBack}
                    className="bg-gray-300 px-4 py-2 rounded"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="bg-[#B82132] text-white px-4 py-2 rounded hover:bg-[#9f1b29]"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {formStep === 3 && (
              <div>
                <label className="block mb-2 font-medium">Dana telah digunakan untuk:</label>
                <textarea
                  className="w-full border rounded p-2 mb-4"
                  rows={3}
                  value={fundUsage}
                  onChange={(e) => setFundUsage(e.target.value)}
                  placeholder="Rincian penggunaan dana..."
                />

                <label className="block mb-2 font-medium">Tantangan yang dihadapi:</label>
                <textarea
                  className="w-full border rounded p-2 mb-4"
                  rows={3}
                  value={challenges}
                  onChange={(e) => setChallenges(e.target.value)}
                  placeholder="Ceritakan tantangan yang dialami..."
                />

                <label className="block mb-2 font-medium">Dukungan yang dibutuhkan:</label>
                <textarea
                  className="w-full border rounded p-2 mb-4"
                  rows={3}
                  value={supportNeeded}
                  onChange={(e) => setSupportNeeded(e.target.value)}
                  placeholder="Apa yang Anda butuhkan dari investor atau pihak lain?"
                />

                <div className="mt-4 flex justify-between">
                  <button
                    onClick={handleBack}
                    className="bg-gray-300 px-4 py-2 rounded"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-[#B82132] text-white px-4 py-2 rounded hover:bg-[#9f1b29]"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
