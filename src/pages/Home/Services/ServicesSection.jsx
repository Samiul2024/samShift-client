import ServiceCard from "./ServiceCard";
import { services } from "./servicesData";

const ServicesSection = () => {
  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Our Services</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            We provide fast, reliable, and secure delivery solutions across
            Bangladesh to support your business growth.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;