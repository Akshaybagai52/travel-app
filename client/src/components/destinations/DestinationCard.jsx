import { Link } from "react-router-dom";

const DestinationCard = ({ destination }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={destination.images[0]}
        alt={destination.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {destination.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-bold">${destination.price}</span>
          <Link
            to={`/destinations/${destination._id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
