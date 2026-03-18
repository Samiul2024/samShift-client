import { useForm } from "react-hook-form";

const RiderApplication = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    const regions = ["Dhaka", "Khulna", "Chattogram", "Rajshahi"];
    const districts = ["Satkhira", "Khulna", "Jessore", "Dhaka"];

    return (
        <section className="bg-base-200 rounded-3xl p-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

                {/* LEFT SIDE */}
                <div>

                    {/* Header */}
                    <h2 className="text-4xl font-bold text-primary mb-2">
                        Be a Rider
                    </h2>

                    <p className="text-gray-500 mb-8">
                        Enjoy fast, reliable parcel delivery with real-time tracking and
                        zero hassle. From personal packages to business shipments — we
                        deliver on time, every time.
                    </p>

                    <h3 className="text-xl font-semibold mb-6">
                        Tell us about yourself
                    </h3>

                    {/* FORM */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        {/* Name */}
                        <div>
                            <label className="label">Your Name</label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="input input-bordered w-full"
                                {...register("name", { required: true })}
                            />
                        </div>

                        {/* License */}
                        <div>
                            <label className="label">Driving License Number</label>
                            <input
                                type="text"
                                placeholder="Driving License Number"
                                className="input input-bordered w-full"
                                {...register("license", { required: true })}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="label">Your Email</label>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="input input-bordered w-full"
                                {...register("email", { required: true })}
                            />
                        </div>

                        {/* Region */}
                        <div>
                            <label className="label">Your Region</label>
                            <select
                                className="select select-bordered w-full"
                                {...register("region")}
                            >
                                <option value="">Select your Region</option>
                                {regions.map((r, i) => (
                                    <option key={i}>{r}</option>
                                ))}
                            </select>
                        </div>

                        {/* District */}
                        <div>
                            <label className="label">Your District</label>
                            <select
                                className="select select-bordered w-full"
                                {...register("district")}
                            >
                                <option value="">Select your District</option>
                                {districts.map((d, i) => (
                                    <option key={i}>{d}</option>
                                ))}
                            </select>
                        </div>

                        {/* NID */}
                        <div>
                            <label className="label">NID No</label>
                            <input
                                type="text"
                                placeholder="NID"
                                className="input input-bordered w-full"
                                {...register("nid")}
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="label">Phone Number</label>
                            <input
                                type="text"
                                placeholder="Phone Number"
                                className="input input-bordered w-full"
                                {...register("phone")}
                            />
                        </div>

                        {/* Bike */}
                        <div>
                            <label className="label">Bike Brand Model and Year</label>
                            <input
                                type="text"
                                placeholder="Bike Brand Model and Year"
                                className="input input-bordered w-full"
                                {...register("bike")}
                            />
                        </div>

                        {/* Registration */}
                        <div>
                            <label className="label">Bike Registration Number</label>
                            <input
                                type="text"
                                placeholder="Bike Registration Number"
                                className="input input-bordered w-full"
                                {...register("bikeReg")}
                            />
                        </div>

                        {/* About */}
                        <div>
                            <label className="label">Tell Us About Yourself</label>
                            <textarea
                                placeholder="Tell Us About Yourself"
                                className="textarea textarea-bordered w-full"
                                {...register("about")}
                            ></textarea>
                        </div>

                        {/* Submit */}
                        <button className="btn bg-lime-400 border-none w-full text-black">
                            Submit
                        </button>
                    </form>
                </div>

                {/* RIGHT SIDE IMAGE */}
                <div className="hidden lg:flex justify-center">
                    <img
                        src="https://i.ibb.co.com/j9yqszhf/agent-pending.png"
                        alt="rider"
                        className="max-h-[450px]"
                    />
                </div>

            </div>
        </section>
    );
};

export default RiderApplication;