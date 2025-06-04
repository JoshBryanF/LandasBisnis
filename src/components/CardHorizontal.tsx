import { Link } from "react-router";

type CardProps = {
  id: string;
  OrganizationName: string;
  Description: string;
  Goals: string;
};

const CardHorizontal = ({ id, OrganizationName, Description, Goals }: CardProps) => {
  const goalNumber = Number(Goals.replace(/[^0-9]/g, ""));
  const progressNumber = Math.floor(Math.random() * goalNumber);
  const progressPercent = Math.min(100, Math.round((progressNumber / goalNumber) * 100));
  const formatRupiah = (num: number) => {
    return "Rp" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const imageUrl = `https://source.unsplash.com/400x200/?startup&sig=${id}`;

  return (
    <div className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
      <img
        src='images/banner.jpg'
        alt={OrganizationName}
        className="w-full md:w-1/3 h-48 md:h-auto object-cover"
      />

      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{`Goal: ${Goals}`}</p>
          <h2 className="text-2xl font-semibold text-[#B82132] mb-2">{OrganizationName}</h2>
          <p className="text-gray-700 text-sm line-clamp-3 mb-4">{Description}</p>
        </div>

        {/* Progress info */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              className="bg-[#B82132] h-2 rounded transition-all duration-1000 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {formatRupiah(progressNumber)} raised of {Goals}
          </p>
        </div>

        <div>
          <Link
            to={`/explore/${id}`}
            className="inline-block text-[#B82132] font-semibold hover:underline"
          >
            Learn more →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardHorizontal;
