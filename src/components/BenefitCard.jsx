export default function BenefitCard({ benefit }) {
    const { img, title, desc } = benefit;

    return (
        <div className="card bg-base-100 shadow-md border">
            <div className="card-body">

                <div className="flex items-center gap-6">

                    {/* Left Image */}
                    <img
                        src={img}
                        alt={title}
                        className="w-12 h-12 object-contain"
                    />

                    {/* Vertical Divider */}
                    <div className="divider divider-horizontal"></div>

                    {/* Right Content */}
                    <div className="flex-1">
                        <h3 className="text-lg font-bold mb-1">
                            {title}
                        </h3>

                        <p className="text-gray-500 text-sm leading-relaxed">
                            {desc}
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
}