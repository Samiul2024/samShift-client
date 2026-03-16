const AboutUs = () => {
    return (
        <section className="bg-base-200 rounded-3xl p-12 my-20">

            {/* Heading */}
            <div className="mb-6">
                <h2 className="text-4xl font-bold mb-3">
                    About Us
                </h2>

                <p className="max-w-xl text-gray-500">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                    From personal packages to business shipments — we deliver on time, every time.
                </p>
            </div>

            <div className="divider"></div>

            {/* Tabs */}
            <div className="tabs tabs-lift">

                {/* STORY TAB */}
                <input
                    type="radio"
                    name="about_tabs"
                    className="tab text-lg font-medium"
                    aria-label="Story"
                    defaultChecked
                />

                <div className="tab-content bg-base-100 border-base-300 p-8 rounded-box">
                    <p className="mb-6 text-gray-600 leading-relaxed">
                        We started with a simple promise — to make parcel delivery fast,
                        reliable, and stress-free. Over the years, our commitment to
                        real-time tracking, efficient logistics, and customer-first
                        service has made us a trusted partner for thousands.
                    </p>

                    <p className="mb-6 text-gray-600 leading-relaxed">
                        Whether it's a personal gift or a time-sensitive business delivery,
                        we ensure it reaches its destination — on time, every time.
                    </p>

                    <p className="text-gray-600 leading-relaxed">
                        Our journey continues as we expand our logistics network and
                        introduce smarter delivery technology.
                    </p>
                </div>


                {/* MISSION TAB */}
                <input
                    type="radio"
                    name="about_tabs"
                    className="tab text-lg font-medium"
                    aria-label="Mission"
                />

                <div className="tab-content bg-base-100 border-base-300 p-8 rounded-box">
                    <p className="text-gray-600 leading-relaxed">
                        Our mission is to simplify parcel delivery through reliable
                        logistics, smart tracking systems, and a customer-first approach.
                        We aim to build the most dependable delivery network in the region.
                    </p>
                </div>


                {/* SUCCESS TAB */}
                <input
                    type="radio"
                    name="about_tabs"
                    className="tab text-lg font-medium"
                    aria-label="Success"
                />

                <div className="tab-content bg-base-100 border-base-300 p-8 rounded-box">
                    <p className="text-gray-600 leading-relaxed">
                        Thousands of successful deliveries every day and strong partnerships
                        with businesses have helped us grow rapidly while maintaining
                        high service quality.
                    </p>
                </div>


                {/* TEAM TAB */}
                <input
                    type="radio"
                    name="about_tabs"
                    className="tab text-lg font-medium"
                    aria-label="Team & Others"
                />

                <div className="tab-content bg-base-100 border-base-300 p-8 rounded-box">
                    <p className="text-gray-600 leading-relaxed">
                        Our dedicated logistics experts, delivery riders, and support
                        team work together to ensure every parcel reaches safely
                        and on time.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default AboutUs;