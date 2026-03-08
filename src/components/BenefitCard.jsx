export default function BenefitCard({ benefit }) {
    const { img, title, desc } = benefit;

    return (
        <div  className="card bg-base-100 shadow-md rounded-3xl hover:shadow-2xl  transition-all duration-300">
            <div data-aos="flip-left" className="card-body">

                <div className="flex flex-col md:flex-row items-center gap-6">

                    {/* Left Image */}
                    <img
                        src={img}
                        alt={title}
                        className="md:w-48 md:h-48 object-contain hover:shadow-2xl  transition-all duration-300 rounded-3xl "
                    />

                    {/* Divider */}
                    <div className="divider md:divider-horizontal"></div>

                    {/* Right Content */}
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-lg md:text-xl font-bold mb-2">
                            {title}
                        </h3>

                        <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                            {desc}
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
}