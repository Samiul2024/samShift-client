import BenefitCard from "./BenefitCard";

import tracking from "../assets/Benefits/tracking.png"
import support from "../assets/Benefits/support.png";
import call from "../assets/Benefits/call.png";

export default function Benefits() {

    const benefitsData = [
        {
            id: 1,
            img: tracking,
            title: "Live Parcel Tracking",
            desc: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates."
        },
        {
            id: 2,
            img: support,
            title: "100% Safe Delivery",
            desc: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe delivery every time."
        },
        {
            id: 3,
            img: call,
            title: "24/7 Call Center Support",
            desc: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns."
        }
    ];

    return (
        <div className="py-16 bg-base-200 space-y-6 my-2 rounded-2xl px-4 md:px-8 lg:px-0  mx-auto">
            <div className="text-center mb-10">

                <h2 className="text-3xl font-bold">
                    Why Choose Us
                </h2>
            </div>
            {benefitsData.map((benefit) => (
                <BenefitCard
                    key={benefit.id}
                    benefit={benefit}
                />
            ))}

        </div>
    );
}