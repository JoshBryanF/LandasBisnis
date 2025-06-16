import { Link } from "react-router";

type CardProps = {
  id: string;
  OrganizationName: string;
  Description: string;
  Goals: string; // Contoh: "Rp50.000.000"
};

const Card = ({ id, OrganizationName, Description, Goals }: CardProps) => {
  const goalNumber = Number(Goals.replace(/[^0-9]/g, ""));
  const progressNumber = Math.floor(Math.random() * goalNumber);
  const progressPercent = Math.min(100, Math.round((progressNumber / goalNumber) * 100));
  const formatRupiah = (num: number) => {
    return "Rp" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // const imageUrl = `https://source.unsplash.com/400x200/?charity&sig=${id}`;

  return (
    <div className="group relative overflow-hidden rounded-xl shadow-lg border border-gray-200 bg-white hover:shadow-2xl transition-all duration-300">
      <img
        src='/images/banner.jpg'
        alt={OrganizationName}
        className="w-full h-48 object-cover"
      />

      {/* Progress bar tipis */}
      <div className="w-full bg-gray-200 h-1 overflow-hidden rounded">
  <div
    className="bg-[#B82132] h-1 rounded-tr-md rounded-br-md transition-all duration-1000 ease-out"
    style={{ width: `${progressPercent}%` }}
  />
</div>

      <div className="p-4">
        {/* Goals di atas judul */}
        <p className="text-sm text-gray-600 mb-1">{`Goal: ${Goals}`}</p>

        <h2 className="text-xl font-semibold text-[#B82132] mb-3">{OrganizationName}</h2>
        <p className="text-gray-700 text-sm line-clamp-3 mb-4">{Description}</p>

        <p className="text-sm text-gray-600 mb-4">
          {formatRupiah(progressNumber)} raised of {Goals}
        </p>

        <Link
          to={`/explore/${id}`}
          className="inline-block text-[#B82132] font-semibold hover:underline"
        >
          Learn more →
        </Link>
      </div>
    </div>
  );
};

export default Card;
