// ONLY FOR DEBUGGING
// console.log("Mounted ForgotPasswordPage", new Date().toISOString());


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router";
import { useState, useEffect} from "react";
import { useFetchUser } from "../api/useFetchUser";
import { axiosInstance } from "../lib/axiosInstance";

// Step 1 schema: email
const emailSchema = z.object({
  email: z.string().email("Format email salah"),
});

// Step 3 schema: new password
const passwordSchema = z.object({
  password: z.string().min(6, "Password minimal 6 karakter"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});

type EmailSchema = z.infer<typeof emailSchema>;
type PasswordSchema = z.infer<typeof passwordSchema>;

const ForgotPasswordPage = () => {
//   const stepRef = useRef(1);
//   const [_, forceRerender] = useState(false);

  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [statusMessage, setStatusMessage] = useState("");


  const emailForm = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
  });

  const passwordForm = useForm<PasswordSchema>({
    resolver: zodResolver(passwordSchema),
  });

  const { users, fetchUsers } = useFetchUser();

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEmailSubmit = (data: EmailSchema) => {
    const user = users.find((u) => u.Email === data.email);
    if (user) {
      setEmail(data.email);
      // TODO: send otp to email
    }
    setStep(2); // regardless of match, move forward
    // stepRef.current = 2;
    // forceRerender(s => !s); 
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // this currently only checks length, doesn't actually check otp match
    if (otp.trim().length === 6) { // TODO: confirm otp is correct or something
      setStep(3);
    //   stepRef.current = 3;
    //   forceRerender(s => !s); 
    }
  };

  const handlePasswordSubmit = async (data: PasswordSchema) => {
  const user = users.find((u) => u.Email === email);
  if (!user) {
    alert("Pengguna tidak ditemukan.");
    return;
  }

  try {
    await axiosInstance.patch(`/user/${user.id}`, {
      Password: data.password,
    });

    // ONLY FOR DEBUGGING
    // console.log("Password updated successfully:", res.data);

    setStatusMessage("Password berhasil diubah. Silakan login.");
    setStep(4);

    // console.log("Setting step to 4", new Date().toISOString());

  } catch (err) {
    console.error("Failed to update password:", err);
    alert("Gagal mengubah password. Silakan coba lagi.");
  }
};



  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="flex rounded-1xl shadow-lg max-w-3xl p-5 items-center relative">
        <button
          onClick={() => navigate("/login")}
          className="absolute text-[#B82132] font-semibold hover:text-[#D2665A] transition top-12 left-20"
        >
          &#8592; Back
        </button>

        <div className="md:w-1/2 px-8 md:px-16">
          {step === 1 && (
            <>
              <h2 className="font-bold text-2xl text-[#B82132]">Reset Password</h2>
              <p className="text-xs mt-4 text-[#B82132]">
                Masukkan email dan kami akan mengirimkan kode OTP.
              </p>
              <form
                className="flex flex-col gap-4 mt-8"
                onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
              >
                <input
                  className="p-2 rounded-xl border border-[#F2B28C]"
                  type="email"
                  placeholder="Email"
                  {...emailForm.register("email")}
                />
                {emailForm.formState.errors.email && (
                  <p className="text-sm text-red-500 bg-red-50 px-3 py-1 rounded">
                    {emailForm.formState.errors.email.message}
                  </p>
                )}
                <button className="bg-[#B82132] rounded-xl text-white py-2 hover:bg-[#F6DED8] duration-300">
                  Kirim OTP
                </button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="font-bold text-2xl text-[#B82132]">Kode OTP</h2>
              <p className="text-xs mt-4 text-[#B82132]">
                Masukkan 6 digit kode yang dikirimkan ke email Anda.
              </p>
              <form className="flex flex-col gap-4 mt-8" onSubmit={handleOtpSubmit}>
                <input
                  className="p-2 rounded-xl border border-[#F2B28C]"
                  type="text"
                  maxLength={6}
                  placeholder="Masukkan OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button className="bg-[#B82132] rounded-xl text-white py-2 hover:bg-[#F6DED8] duration-300">
                  Verifikasi
                </button>
              </form>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="font-bold text-2xl text-[#B82132]">Password Baru</h2>
              <p className="text-xs mt-4 text-[#B82132]">
                Masukkan password baru Anda.
              </p>
              <form
                className="flex flex-col gap-4 mt-8"
                onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
              >
                <input
                  className="p-2 rounded-xl border border-[#F2B28C]"
                  type="password"
                  placeholder="Password baru"
                  {...passwordForm.register("password")}
                />
                {passwordForm.formState.errors.password && (
                  <p className="text-sm text-red-500 bg-red-50 px-3 py-1 rounded">
                    {passwordForm.formState.errors.password.message}
                  </p>
                )}
                <input
                  className="p-2 rounded-xl border border-[#F2B28C]"
                  type="password"
                  placeholder="Konfirmasi password"
                  {...passwordForm.register("confirmPassword")}
                />
                {passwordForm.formState.errors.confirmPassword && (
                  <p className="text-sm text-red-500 bg-red-50 px-3 py-1 rounded">
                    {passwordForm.formState.errors.confirmPassword.message}
                  </p>
                )}
                <button className="bg-[#B82132] rounded-xl text-white py-2 hover:bg-[#F6DED8] duration-300">
                  Simpan Password
                </button>
              </form>
            </>
          )}

          {step === 4 && (
            <div className="flex flex-col items-center text-center gap-4 mt-12">
              <p className="text-green-700 bg-green-100 px-4 py-2 rounded">
                {statusMessage}
              </p>
              <button
                onClick={() => navigate("/login")}
                className="mt-4 bg-[#B82132] text-white px-6 py-2 rounded-xl hover:bg-[#F6DED8] duration-300"
              >
                Kembali ke Login
              </button>
            </div>
          )}
        </div>

        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src="/images/Login.jpg" />
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
