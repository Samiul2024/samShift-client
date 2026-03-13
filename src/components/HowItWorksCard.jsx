const HowItWorksCard = ({ item, index }) => {
  const { icon: Icon, title, description } = item;

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 100}
      data-aos-duration="800"
      className="bg-gray-100 p-10 rounded-3xl text-center hover:shadow-xl hover:-translate-y-2 transition duration-300"
    >
      <div className="flex justify-center mb-6">
        <Icon className="text-4xl text-teal-700" />
      </div>

      <h3 className="text-xl font-semibold text-teal-900 mb-3">
        {title}
      </h3>

      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default HowItWorksCard;