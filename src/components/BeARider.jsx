import { useLoaderData } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const BeARider = () => {
    const coverageData = useLoaderData();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    // ---------------- WATCH ----------------
    const selectedRegion = watch("region");
    const selectedDistrict = watch("district");

    // ---------------- REGIONS ----------------
    const regions = [...new Set(coverageData.map((d) => d.region))];

    // ---------------- DISTRICTS ----------------
    const districts = coverageData.filter(
        (d) => d.region === selectedRegion
    );

    // ---------------- SERVICE AREAS ----------------
    const serviceAreas =
        coverageData.find((d) => d.district === selectedDistrict)
            ?.covered_area || [];

    // ---------------- SUBMIT ----------------
    const onSubmit = (data) => {
        const riderData = {
            ...data,
            email: user?.email,
            status: "pending", // 🔥 important for admin approval
            applied_at: new Date().toISOString(),
        };

        console.log("Rider Application:", riderData);

        axiosSecure.post("/riders", riderData)
            .then(res => {
                if (res.data.insertedId) {
                    // console.log(res.data.insertedId );
                    Swal.fire({
                        icon: "success",
                        title: "Application Submitted!",
                        text: "Your rider application is under review.",
                        confirmButtonColor: "#22c55e",
                    });
                    // reset();
                }
            })
            .catch(err => {
                console.error(err);
                Swal.fire({
                    icon: "error",
                    title: "Failed!",
                    text: "Something went wrong.",
                });
            });
    };

    return (
        <section className="bg-base-200 rounded-3xl p-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

                {/* LEFT SIDE */}
                <div>
                    <h2 className="text-4xl font-bold text-primary mb-2">
                        Be a Rider
                    </h2>

                    <p className="text-gray-500 mb-8">
                        Join our delivery network and earn by delivering parcels
                        in your area.
                    </p>

                    <h3 className="text-xl font-semibold mb-6">
                        Tell us about yourself
                    </h3>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        {/* Name */}
                        <input
                            defaultValue={user?.displayName}
                            className="input input-bordered w-full"
                            placeholder="Your Name"
                            {...register("name", { required: true })}
                        />

                        {/* Email */}
                        <input
                            defaultValue={user?.email}
                            readOnly
                            className="input input-bordered w-full"
                            {...register("email")}
                        />

                        {/* Phone */}
                        <input
                            className="input input-bordered w-full"
                            placeholder="Phone Number"
                            {...register("phone", { required: true })}
                        />

                        {/* NID */}
                        <input
                            className="input input-bordered w-full"
                            placeholder="NID Number"
                            {...register("nid", { required: true })}
                        />

                        {/* License */}
                        <input
                            className="input input-bordered w-full"
                            placeholder="Driving License Number"
                            {...register("license", { required: true })}
                        />

                        {/* Region */}
                        <select
                            className="select select-bordered w-full"
                            {...register("region", { required: true })}
                        >
                            <option value="">Select Region</option>
                            {regions.map((r, i) => (
                                <option key={i} value={r}>{r}</option>
                            ))}
                        </select>

                        {/* District */}
                        <select
                            disabled={!selectedRegion}
                            className="select select-bordered w-full"
                            {...register("district", { required: true })}
                        >
                            <option value="">Select District</option>
                            {districts.map((d, i) => (
                                <option key={i} value={d.district}>
                                    {d.district}
                                </option>
                            ))}
                        </select>

                        {/* Service Area */}
                        <select
                            disabled={!selectedDistrict}
                            className="select select-bordered w-full"
                            {...register("serviceArea", { required: true })}
                        >
                            <option value="">Select Service Area</option>
                            {serviceAreas.map((area, i) => (
                                <option key={i} value={area}>{area}</option>
                            ))}
                        </select>

                        {/* Bike Info */}
                        <input
                            className="input input-bordered w-full"
                            placeholder="Bike Brand, Model & Year"
                            {...register("bike", { required: true })}
                        />

                        {/* Bike Registration */}
                        <input
                            className="input input-bordered w-full"
                            placeholder="Bike Registration Number"
                            {...register("bikeReg", { required: true })}
                        />

                        {/* About */}
                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Tell us about yourself"
                            {...register("about")}
                        ></textarea>

                        {/* Submit */}
                        <button className="btn bg-lime-400 border-none w-full text-black">
                            Submit Application
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

export default BeARider;