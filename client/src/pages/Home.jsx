import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import destinationService from "../services/destinationService";
import DestinationCard from "../components/destinations/DestinationCard";

const Home = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const { data } = await destinationService.getDestinations({
          limit: 3,
          sort: "-ratingsAverage",
        });
        setDestinations(data.data.destinations);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Discover Amazing Places</h1>
        <p className="text-xl text-gray-600 mb-8">
          Explore the world's most beautiful destinations with us
        </p>
        <Link
          to="/destinations"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg"
        >
          Browse Destinations
        </Link>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <DestinationCard key={destination._id} destination={destination} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
