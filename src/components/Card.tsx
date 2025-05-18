import { Link } from "react-router";

type CardProps = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  imageUrl: string;
};

const Card = (props: CardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-xl shadow-lg border border-gray-200 bg-white hover:shadow-2xl transition-all duration-300">
      <img
        src={props.imageUrl}
        alt={props.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-[#B82132]">{props.name}</h2>
        <p className="text-sm text-gray-500">{props.address}</p>
        <p className="text-sm text-gray-500">{props.phone}</p>
        <p className="text-sm text-gray-500 mb-2">{props.email}</p>
        <p className="text-gray-700 text-sm line-clamp-3">{props.description}</p>

        <Link
          to={`/explore/${props.id}`}
          className="inline-block mt-4 text-[#B82132] font-semibold hover:underline"
        >
          Learn more →
        </Link>
      </div>
    </div>
  );
};

export default Card;
