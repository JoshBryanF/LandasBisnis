import { useState } from "react";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useCreateSponsoree } from "../api/useCreateSponsoree";
import { Navigate, useNavigate } from "react-router";
import NavBar from "../components/NavBar";


const schema = z.object({
  PersonalAddress: z.string().min(1, "Personal address wajib diisi"),
  PersonalPhoneNumber: z.string().min(1, "Personal phone number wajib diisi"),
  OrganizationEmail: z.string().email("Email organisasi tidak valid"),
  OrganizationPhoneNumber: z.string().min(1, "Organization phone number wajib diisi"),
  OrganizationAddress: z.string().min(1, "Organization address wajib diisi"),
  OrganizationName: z.string().min(1, "Organization name wajib diisi"),
  Description: z.string().min(1, "Deskripsi wajib diisi"),
  Goals: z.string().min(1, "Tujuan wajib diisi"),
});

type FormData = z.infer<typeof schema>;

const steps = ["Campaign", "Organizer", "Goal", "Review"];

const stepDescriptions = [
  {
    title: "Tell us about your campaign",
    desc: "Apa nama organisasi dan alamatnya?",
  },
  {
    title: "Who is organizing this?",
    desc: "Isi nomor dan alamat pribadi Anda.",
  },
  {
    title: "Set your goal",
    desc: "Ceritakan tujuan dan deskripsi singkat dari proyek Anda.",
  },
  {
    title: "Review your information",
    desc: "Periksa semua informasi sebelum submit.",
  },
];

export default function StartProjectPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    PersonalAddress: "",
    PersonalPhoneNumber: "",
    OrganizationEmail: "",
    OrganizationPhoneNumber: "",
    OrganizationAddress: "",
    OrganizationName: "",
    Description: "",
    Goals: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const { handleCreateSponsoree, createSponsoreeLoading } = useCreateSponsoree();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validateStep = () => {
    const currentFields =
      step === 0
        ? ["OrganizationName", "OrganizationAddress", "OrganizationPhoneNumber", "OrganizationEmail"]
        : step === 1
        ? ["PersonalPhoneNumber", "PersonalAddress"]
        : step === 2
        ? ["Goals", "Description"]
        : [];

    const result = schema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const stepErrors = Object.keys(fieldErrors)
        .filter((field) => currentFields.includes(field))
        .reduce((acc, field) => {
          acc[field as keyof FormData] = fieldErrors[field]?.[0] || "";
          return acc;
        }, {} as Partial<Record<keyof FormData, string>>);

      setErrors(stepErrors);
      return Object.keys(stepErrors).length === 0;
    }

    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((s) => Math.min(s + 1, steps.length - 1));
    }
  };
  const navigate = useNavigate();

  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    const result = schema.safeParse(formData);
    if (result.success) {
      await handleCreateSponsoree(formData);
      alert("Data submitted!");
      navigate('/');
    } else {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(
        Object.keys(fieldErrors).reduce((acc, field) => {
          acc[field as keyof FormData] = fieldErrors[field]?.[0] || "";
          return acc;
        }, {} as Partial<Record<keyof FormData, string>>)
      );
    }
  };

  const progressPercent = ((step + 1) / steps.length) * 100;

  return (
    <div>
      <NavBar forceSolidBackground/>
      <div className="w-full h-screen flex flex-col md:flex-row">
        <div className="hidden md:flex md:w-1/2 bg-[#F6DED8] p-10 items-center">
          <div className="max-w-md space-y-4">
            <h2 className="text-3xl font-bold text-[#B82132]">{stepDescriptions[step].title}</h2>
            <p className="text-gray-600 text-lg">{stepDescriptions[step].desc}</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-10 bg-white">
          <div className="max-w-xl w-full mx-auto">
            <h2 className="text-4xl font-bold mb-4">Start Project</h2>
            <p className="text-gray-500 mb-6 text-base">
              Step {step + 1} of {steps.length}: <strong>{steps[step]}</strong>
            </p>

            <div className="w-full h-2 rounded bg-gray-200 mb-6 overflow-hidden">
              <motion.div
                className="h-2 bg-[#B82132]"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {step === 0 && (
                  <>
                    <input
                      name="OrganizationName"
                      placeholder="Organization Name"
                      onChange={handleChange}
                      value={formData.OrganizationName}
                      className="w-full p-3 border rounded-lg"
                    />
                    {errors.OrganizationName && <p className="text-red-600">{errors.OrganizationName}</p>}

                    <input
                      name="OrganizationAddress"
                      placeholder="Organization Address"
                      onChange={handleChange}
                      value={formData.OrganizationAddress}
                      className="w-full p-3 border rounded-lg"
                    />
                    {errors.OrganizationAddress && <p className="text-red-600">{errors.OrganizationAddress}</p>}

                    <input
                      name="OrganizationPhoneNumber"
                      placeholder="Organization Phone"
                      onChange={handleChange}
                      value={formData.OrganizationPhoneNumber}
                      className="w-full p-3 border rounded-lg"
                    />
                    {errors.OrganizationPhoneNumber && <p className="text-red-600">{errors.OrganizationPhoneNumber}</p>}

                    <input
                      name="OrganizationEmail"
                      type="email"
                      placeholder="Organization Email"
                      onChange={handleChange}
                      value={formData.OrganizationEmail}
                      className="w-full p-3 border rounded-lg"
                    />
                    {errors.OrganizationEmail && <p className="text-red-600">{errors.OrganizationEmail}</p>}
                  </>
                )}

                {step === 1 && (
                  <>
                    <input
                      name="PersonalPhoneNumber"
                      placeholder="Personal Phone"
                      onChange={handleChange}
                      value={formData.PersonalPhoneNumber}
                      className="w-full p-3 border rounded-lg"
                    />
                    {errors.PersonalPhoneNumber && <p className="text-red-600">{errors.PersonalPhoneNumber}</p>}

                    <input
                      name="PersonalAddress"
                      placeholder="Personal Address"
                      onChange={handleChange}
                      value={formData.PersonalAddress}
                      className="w-full p-3 border rounded-lg"
                    />
                    {errors.PersonalAddress && <p className="text-red-600">{errors.PersonalAddress}</p>}
                  </>
                )}

                {step === 2 && (
                  <>
                    <textarea
                      name="Goals"
                      placeholder="Your Goal"
                      onChange={handleChange}
                      value={formData.Goals}
                      className="w-full p-3 border rounded-lg"
                      rows={3}
                    />
                    {errors.Goals && <p className="text-red-600">{errors.Goals}</p>}

                    <textarea
                      name="Description"
                      placeholder="Short Description"
                      onChange={handleChange}
                      value={formData.Description}
                      className="w-full p-3 border rounded-lg"
                      rows={4}
                    />
                    {errors.Description && <p className="text-red-600">{errors.Description}</p>}
                  </>
                )}

                {step === 3 && (
                  <div className="text-sm space-y-2">
                    {Object.entries(formData).map(([key, value]) => (
                      <div key={key}>
                        <strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {value}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                disabled={step === 0}
                className="px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              >
                Back
              </button>
              {step < steps.length - 1 ? (
                <button onClick={nextStep} className="px-4 py-2 bg-[#B82132] text-white rounded hover:bg-[#B82132]">
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={createSponsoreeLoading}
                  className="px-4 py-2 bg-[#B82132] text-white rounded hover:bg-[#B82132]"
                >
                  {createSponsoreeLoading ? "Submitting..." : "Submit"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
