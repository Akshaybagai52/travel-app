const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About TravelApp</h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4">
            TravelApp was founded in 2023 with a simple mission: to make travel
            planning easier and more enjoyable for everyone. We believe that
            exploring new places should be exciting, not stressful.
          </p>
          <p className="text-gray-700">
            Our team of travel enthusiasts works tirelessly to curate the best
            destinations and experiences from around the world, ensuring you get
            the most out of your adventures.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Curated selection of unique destinations</li>
            <li>Easy booking process</li>
            <li>Verified reviews from fellow travelers</li>
            <li>24/7 customer support</li>
            <li>Competitive pricing</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p className="text-gray-700 mb-4">
            We're a diverse group of travel experts, developers, and customer
            service professionals who are passionate about creating the best
            travel experience for our users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
