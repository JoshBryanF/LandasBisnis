import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useCreateSponsoree } from "../api/useCreateSponsoree";

const schema = z.object({
  PersonalAddress: z.string().min(1, "Personal address wajib diisi"),
  PersonalPhoneNumber: z.string().min(1, "Personal phone number wajib diisi"),
  OrganizationEmail: z.string().email("Email organisasi tidak valid"),
  OrganizationPhoneNumber: z.string().min(1, "Organization phone number wajib diisi"),
  OrganizationAddress: z.string().min(1, "Organization address wajib diisi"),
  OrganizationName: z.string().min(1, "Organization name wajib diisi"),
});

type FormData = z.infer<typeof schema>;

const StartProjectPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const {createSponsoreeLoading,
        createSponsoreeError,
        handleCreateSponsoree} = useCreateSponsoree();

  const onSubmit = async (data: FormData) => {
    handleCreateSponsoree(data)
  };

  // if (isSubmitSuccessful) {
  //   return (
  //     <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
  //       <div className="max-w-md p-8 bg-white rounded-xl shadow text-center">
  //         <h2 className="text-2xl font-semibold mb-4 text-[#B82132]">Terima kasih!</h2>
  //         <p>Form start project Anda telah berhasil dikirim.</p>
  //       </div>
  //     </section>
  //   );
  // }

  return (
    
    <div>
      <NavBar/>
      <section className="min-h-screen flex items-center justify-center px-4 mt-25 mb-20">
        <div className="relative flex max-w-4xl rounded-xl shadow-lg bg-white p-6 md:p-10 items-center w-full">
          {/* Form sisi kiri */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full md:w-1/2 px-4 md:px-10"
            noValidate
          >
            <h2 className="text-3xl font-bold text-[#B82132] mb-6">Start Project</h2>

            <label className="block mb-4">
              <span className="text-gray-700 font-semibold">Personal Address</span>
              <input
                {...register("PersonalAddress")}
                type="text"
                placeholder="Masukkan alamat pribadi"
                className={`mt-1 block w-full rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-[#D2665A] ${
                  errors.PersonalAddress ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.PersonalAddress && (
                <p className="text-red-600 mt-1 text-sm">{errors.PersonalAddress.message}</p>
              )}
            </label>

            <label className="block mb-4">
              <span className="text-gray-700 font-semibold">Personal Phone Number</span>
              <input
                {...register("PersonalPhoneNumber")}
                type="tel"
                placeholder="Masukkan nomor telepon pribadi"
                className={`mt-1 block w-full rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-[#D2665A] ${
                  errors.PersonalPhoneNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.PersonalPhoneNumber && (
                <p className="text-red-600 mt-1 text-sm">{errors.PersonalPhoneNumber.message}</p>
              )}
            </label>

            <label className="block mb-4">
              <span className="text-gray-700 font-semibold">Organization Email</span>
              <input
                {...register("OrganizationEmail")}
                type="email"
                placeholder="Masukkan email organisasi"
                className={`mt-1 block w-full rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-[#D2665A] ${
                  errors.OrganizationEmail ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.OrganizationEmail && (
                <p className="text-red-600 mt-1 text-sm">{errors.OrganizationEmail.message}</p>
              )}
            </label>

            <label className="block mb-4">
              <span className="text-gray-700 font-semibold">Organization Phone Number</span>
              <input
                {...register("OrganizationPhoneNumber")}
                type="tel"
                placeholder="Masukkan nomor telepon organisasi"
                className={`mt-1 block w-full rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-[#D2665A] ${
                  errors.OrganizationPhoneNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.OrganizationPhoneNumber && (
                <p className="text-red-600 mt-1 text-sm">{errors.OrganizationPhoneNumber.message}</p>
              )}
            </label>

            <label className="block mb-4">
              <span className="text-gray-700 font-semibold">Organization Address</span>
              <input
                {...register("OrganizationAddress")}
                type="text"
                placeholder="Masukkan alamat organisasi"
                className={`mt-1 block w-full rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-[#D2665A] ${
                  errors.OrganizationAddress ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.OrganizationAddress && (
                <p className="text-red-600 mt-1 text-sm">{errors.OrganizationAddress.message}</p>
              )}
            </label>

            <label className="block mb-6">
              <span className="text-gray-700 font-semibold">Organization Name</span>
              <input
                {...register("OrganizationName")}
                type="text"
                placeholder="Masukkan nama organisasi"
                className={`mt-1 block w-full rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-[#D2665A] ${
                  errors.OrganizationName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.OrganizationName && (
                <p className="text-red-600 mt-1 text-sm">{errors.OrganizationName.message}</p>
              )}
            </label>

            <button
              type="submit"
              className="w-full bg-[#B82132] text-white py-3 rounded-xl font-semibold hover:bg-[#D2665A] transition"
            >
              Submit
            </button>
          </form>

          {/* Gambar sisi kanan */}
          <div className="hidden md:block md:w-1/2">
            <img
              src="/images/start.jpg"
              alt="Start Project Banner"
              className="rounded-2xl object-cover w-auto h-full"
            />
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default StartProjectPage;
