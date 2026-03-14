import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
    {
        id: 1,
        name: "Rasel Ahamed",
        role: "CTO",
        message:
            "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    },
    {
        id: 2,
        name: "Awlad Hossin",
        role: "Senior Product Designer",
        message:
            "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    },
    {
        id: 3,
        name: "Nasir Uddin",
        role: "CEO",
        message:
            "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    },
    {
        id: 4,
        name: "Tanvir Hasan",
        role: "Developer",
        message:
            "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    },
];

const Testimonials = () => {
    return (
        <section className="bg-black my-4 rounded-2xl py-20 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
                What our customers are sayings
            </h2>

            <p className="text-gray-400 max-w-xl mx-auto mb-16">
                Enhance posture, mobility, and well-being effortlessly with Posture
                Pro. Achieve proper alignment, reduce pain, and strengthen your body
                with ease!
            </p>

            <div className="max-w-6xl mx-auto">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    slidesPerView={3}
                    spaceBetween={30}
                    centeredSlides={true}
                    loop={true}
                    autoplay={{ delay: 3000 }}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {testimonials.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="bg-base-100 text-black rounded-3xl p-8 shadow-xl">
                                <div className="text-5xl text-teal-400 mb-4">“</div>

                                <p className="text-gray-600 mb-6">{item.message}</p>

                                <div className="border-t border-dashed pt-4 flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-teal-700"></div>

                                    <div className="text-left">
                                        <h4 className="font-semibold">{item.name}</h4>
                                        <p className="text-sm text-gray-500">{item.role}</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonials;