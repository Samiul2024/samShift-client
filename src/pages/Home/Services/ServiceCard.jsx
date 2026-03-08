const ServiceCard = ({ service }) => {
    const { icon: Icon, title, description } = service;

    return (
        <div className="card w-full max-w-sm min-h-[260px] bg-base-100 shadow-md hover:shadow-2xl  transition-all duration-300 rounded-3xl border">
            <div className="card-body items-center text-center">
                <Icon className="text-4xl text-primary mb-4" />

                <h3 className="card-title text-lg font-semibold">
                    {title}
                </h3>

                <p className="text-sm text-gray-500">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default ServiceCard;