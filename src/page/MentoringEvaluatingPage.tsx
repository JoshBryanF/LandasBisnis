import { useEffect, useState } from "react";
import { useAuthUser } from "../auth/auth";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { axiosInstance } from "../lib/axiosInstance";

type EvaluatedProject = {
  id: string;
  OrganizationName: string;
  Description: string;
  Goals: string;
  progress?: number;
  lastMentoringNote?: string;
  OrganizationBanner?: string;  // untuk URL gambar banner
};

const MentoringEvaluationPage = () => {
  const user = useAuthUser();
  const [project, setProject] = useState<EvaluatedProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [mentoringMethod, setMentoringMethod] = useState("");
  const [evaluation, setEvaluation] = useState({
    progress: "",
    challenges: "",
    recommendations: "",
  });

  useEffect(() => {
    if (user?.Sponsored) {
      axiosInstance
        .get(`/user/${user.Sponsored}`)
        .then((res) => {
          setProject(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleSubmitEvaluation = () => {
    if (!project) return;

    const payload = {
      progress: evaluation.progress,
      challenges: evaluation.challenges,
      recommendations: evaluation.recommendations,
      investorId: user?.id,
      projectId: project.id,
    };

    axiosInstance
      .post(`/projects/${project.id}/investor-evaluation`, payload)
      .then(() => {
        alert("Terima kasih atas evaluasi Anda!");
        setEvaluation({ progress: "", challenges: "", recommendations: "" });
      })
      .catch((error) => {
        console.error("Error submitting evaluation:", error);
        alert("Gagal mengirim evaluasi.");
      });
  };

  const handleScheduleMentoring = () => {
    if (!mentoringMethod) {
      alert("Pilih metode mentoring terlebih dahulu.");
      return;
    }
    alert(`Mentoring via ${mentoringMethod} akan dijadwalkan.`);
  };

  return (
    <div>
      <NavBar />
      <section className="max-w-5xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold text-[#B82132] mb-6 mt-10">
          Evaluasi & Mentoring Investor
        </h1>

        {loading ? (
          <p className="text-gray-600">Memuat data...</p>
        ) : !project ? (
          <p className="text-gray-600">Belum ada proyek yang Anda danai.</p>
        ) : (
          <div className="border rounded-lg p-6 shadow-sm bg-white space-y-6">
            {/* Banner gambar */}
            <img
              src={project.OrganizationBanner || "/images/banner.jpg"}
              alt={project.OrganizationName}
              className="rounded-xl w-full h-64 object-cover mb-6"
            />

            {/* Info proyek */}
            <div>
              <h2 className="text-xl font-semibold text-[#B82132] mb-2">
                {project.OrganizationName}
              </h2>
              <p className="text-gray-700 mb-2">{project.Description}</p>
              <p className="text-gray-600 text-sm mb-4">
                Target Dana: {project.Goals}
              </p>

              {/* Progress bar */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Progress Evaluasi:</p>
                <div className="w-full h-2 bg-gray-200 rounded">
                  <div
                    className="h-2 bg-[#B82132] rounded"
                    style={{ width: `${project.progress ?? 0}%` }}
                  />
                </div>
                <p className="text-xs text-right text-gray-500 mt-1">
                  {project.progress ?? 0}%
                </p>
              </div>

              {project.lastMentoringNote && (
                <p className="text-sm text-gray-600 italic mb-4">
                  Catatan mentoring terakhir: "{project.lastMentoringNote}"
                </p>
              )}
            </div>

            {/* Form Evaluasi Investor */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#B82132]">
                Berikan Tanggapan Anda
              </h3>

              <label className="block mb-2 font-medium">Kemajuan Proyek Menurut Anda</label>
              <textarea
                className="w-full border rounded p-2 mb-4"
                rows={3}
                value={evaluation.progress}
                onChange={(e) =>
                  setEvaluation({ ...evaluation, progress: e.target.value })
                }
                placeholder="Tuliskan tanggapan Anda terkait kemajuan proyek"
              />

              <label className="block mb-2 font-medium">Tantangan yang Terlihat</label>
              <textarea
                className="w-full border rounded p-2 mb-4"
                rows={3}
                value={evaluation.challenges}
                onChange={(e) =>
                  setEvaluation({ ...evaluation, challenges: e.target.value })
                }
                placeholder="Tuliskan tantangan yang menurut Anda dihadapi proyek"
              />

              <label className="block mb-2 font-medium">Rekomendasi atau Dukungan</label>
              <textarea
                className="w-full border rounded p-2 mb-4"
                rows={3}
                value={evaluation.recommendations}
                onChange={(e) =>
                  setEvaluation({ ...evaluation, recommendations: e.target.value })
                }
                placeholder="Berikan rekomendasi atau dukungan untuk proyek"
              />

              <button
                onClick={handleSubmitEvaluation}
                className="bg-[#B82132] text-white px-4 py-2 rounded hover:bg-[#9f1b29]"
              >
                Kirim Evaluasi
              </button>
            </div>

            {/* Opsi Mentoring */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2 text-[#B82132]">Pilih Metode Mentoring</h3>
              <select
                className="border p-2 rounded w-full mb-4"
                value={mentoringMethod}
                onChange={(e) => setMentoringMethod(e.target.value)}
              >
                <option value="">-- Pilih Metode --</option>
                <option value="Zoom">Zoom</option>
                <option value="Google Meet">Google Meet</option>
                <option value="Chat">Chat di Platform</option>
                <option value="Telepon">Telepon</option>
              </select>
              <button
                onClick={handleScheduleMentoring}
                className="border border-[#B82132] text-[#B82132] px-4 py-2 rounded hover:bg-[#fef2f2]"
              >
                Jadwalkan Mentoring
              </button>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default MentoringEvaluationPage;
