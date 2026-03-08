import Marquee from "react-fast-marquee";

import amazonVector from "../assets/brands/amazon_vector.png";
import amazon from "../assets/brands/amazon.png";
import casio from "../assets/brands/casio.png";
import moonstar from "../assets/brands/moonstar.png";
import randstad from "../assets/brands/randstad.png";
import star from "../assets/brands/star.png";
import startPeople from "../assets/brands/start_people.png";

const logos = [
  amazonVector,
  amazon,
  casio,
  moonstar,
  randstad,
  star,
  startPeople,
];

export default function BrandSlider() {
  return (
    <section className="py-8 rounded-4xl my-2 bg-base-200">

      {/* Section Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">
          We've helped thousands of sales teams        </h2>
      </div>

      {/* Logo Marquee */}
      <Marquee
        speed={50}
        pauseOnHover={true}
        gradient={true}
        gradientColor={[248, 250, 252]}
      >
        {logos.map((logo, index) => (
          <div key={index} className="mx-24">
            <img
              src={logo}
              alt="brand"
              className="h-6 w-auto grayscale hover:grayscale-0 transition duration-300"
            />
          </div>
        ))}
      </Marquee>

    </section>
  );
}