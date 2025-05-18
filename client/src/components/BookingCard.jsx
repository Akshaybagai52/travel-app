import { Link } from "react-router-dom";
import { format } from "date-fns";

const BookingCard = ({ booking }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold mb-2">
              <Link
                to={`/destinations/${booking.destination._id}`}
                className="hover:text-blue-600"
              >
                {booking.destination.name}
              </Link>
            </h3>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Date:</span>{" "}
              {format(new Date(booking.startDate), "MMM dd, yyyy")}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Participants:</span>{" "}
              {booking.participants}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">${booking.price}</p>
            <p className="text-sm text-gray-500">
              {booking.paid ? "Paid" : "Pending"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
