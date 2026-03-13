// HowItWorks.jsx

import { howItWorksData } from "../data/howItWorksData";
import HowItWorksCard from "../components/HowItWorksCard";

const HowItWorks = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 py-20">

            <h2 className="text-4xl font-bold text-teal-900 mb-12">
                How it Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                {howItWorksData.map((item, index) => (
                    <HowItWorksCard
                        key={index}
                        item={item}
                        index={index}
                    />
                ))}

            </div>

        </section>
    );
};

export default HowItWorks;