import { Link } from "react-router";
import type {ProjectResponse} from "../api/useFetchProjects"


const Card = (props: ProjectResponse) => {
  return (
    <div className="group relative overflow-hidden rounded-xl shadow-lg border border-gray-200 bg-white hover:shadow-2xl transition-all duration-300">
      <img
        src={"/images/banner.jpg"}
        alt={props.OrganizationName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-[#B82132]">{props.OrganizationName}</h2>
        <p className="text-sm text-gray-500">{props.OrganizationAddress}</p>
        <p className="text-sm text-gray-500">{props.OrganizationPhoneNumber}</p>
        <p className="text-sm text-gray-500 mb-2">{props.PersonalAddress}</p>
        <p className="text-gray-700 text-sm line-clamp-3">{props.OrganizationAddress}</p>

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
