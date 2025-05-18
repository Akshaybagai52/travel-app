import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import destinationService from "../services/destinationService";
import DestinationCard from "../components/destinations/DestinationCard";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    difficulty: "",
    price: "",
    duration: "",
  });

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const params = Object.fromEntries([...searchParams]);
        const { data } = await destinationService.getDestinations(params);
        setDestinations(data.data.destinations);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const params = {};
    if (filters.difficulty) params.difficulty = filters.difficulty;
    if (filters.price) params.price = filters.price;
    if (filters.duration) params.duration = filters.duration;
    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({
      difficulty: "",
      price: "",
      duration: "",
    });
    setSearchParams({});
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Filter Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2">Difficulty</label>
            <select
              name="difficulty"
              value={filters.difficulty}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            >
              <option value="">All</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="difficult">Difficult</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Max Price</label>
            <select
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            >
              <option value="">All</option>
              <option value="1000">Under $1000</option>
              <option value="2000">Under $2000</option>
              <option value="5000">Under $5000</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Duration (days)</label>
            <select
              name="duration"
              value={filters.duration}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            >
              <option value="">All</option>
              <option value="7">Under 7 days</option>
              <option value="14">Under 14 days</option>
              <option value="21">Under 21 days</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex space-x-4">
          <button
            onClick={applyFilters}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Apply Filters
          </button>
          <button
            onClick={clearFilters}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination) => (
          <DestinationCard key={destination._id} destination={destination} />
        ))}
      </div>
    </div>
  );
};

export default Destinations;
