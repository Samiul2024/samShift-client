import { useLoaderData } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SendParcel = ({ user }) => {
    const districtsData = useLoaderData();
    const { register, handleSubmit, watch, reset } = useForm();

    const [cost, setCost] = useState(0);

    // ---------------- WATCH FORM VALUES ----------------
    const parcelType = watch("type");
    const weight = watch("weight");

    const senderRegion = watch("senderRegion");
    const senderDistrict = watch("senderDistrict");

    const receiverRegion = watch("receiverRegion");
    const receiverDistrict = watch("receiverDistrict");

    // ---------------- REGION LIST ----------------
    const regions = [...new Set(districtsData.map((d) => d.region))];

    // ---------------- DISTRICTS ----------------
    const senderDistricts = districtsData.filter((d) => d.region === senderRegion);
    const receiverDistricts = districtsData.filter((d) => d.region === receiverRegion);

    // ---------------- SERVICE CENTERS ----------------
    const senderCenters =
        districtsData.find((d) => d.district === senderDistrict)?.covered_area || [];
    const receiverCenters =
        districtsData.find((d) => d.district === receiverDistrict)?.covered_area || [];

    // ---------------- COST CALCULATION ----------------
    useEffect(() => {
        if (!parcelType) return;

        let deliveryCost = 0;
        const insideDistrict = senderDistrict === receiverDistrict;

        if (parcelType === "document") {
            deliveryCost = insideDistrict ? 60 : 80;
        } else {
            const w = parseFloat(weight) || 0;
            if (insideDistrict) {
                deliveryCost = w <= 3 ? 110 : 110 + (w - 3) * 40;
            } else {
                deliveryCost = w <= 3 ? 150 : 150 + (w - 3) * 40;
            }
        }

        setCost(deliveryCost);
    }, [parcelType, weight, senderDistrict, receiverDistrict]);

    // ---------------- SUBMIT ----------------
    const onSubmit = (data) => {
        toast((t) => (
            <div className="space-y-3">
                <p className="font-semibold text-lg">Delivery Cost: {cost} BDT</p>
                <button
                    className="btn btn-success btn-sm"
                    onClick={() => confirmSubmission(data, t.id)}
                >
                    Confirm Parcel
                </button>
            </div>
        ), { duration: Infinity });
    };

    // ---------------- FINAL CONFIRM ----------------
    const confirmSubmission = (data, toastId) => {
        const parcelData = {
            ...data,
            delivery_cost: cost,
            creation_date: new Date(),
        };

        console.log("Parcel Data:", parcelData);

        toast.dismiss(toastId);
        toast.success("Parcel booked successfully!");

        reset();
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Hot Toast Container */}
            <Toaster position="top-center" />

            {/* Heading */}
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold">Send a Parcel</h2>
                <p className="text-gray-500">Fill the form to schedule your parcel delivery</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                {/* PARCEL INFO */}
                <div className="bg-base-200 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-6">Parcel Info</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        {/* Parcel Type */}
                        <div>
                            <label className="label">Parcel Type</label>
                            <div className="flex gap-6">
                                <label className="flex gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        value="document"
                                        className="radio radio-primary"
                                        {...register("type", { required: true })}
                                    />
                                    Document
                                </label>
                                <label className="flex gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        value="non-document"
                                        className="radio radio-primary"
                                        {...register("type", { required: true })}
                                    />
                                    Non Document
                                </label>
                            </div>
                        </div>

                        {/* Title */}
                        <input
                            className="input input-bordered"
                            placeholder="Describe the parcel"
                            {...register("title", { required: true })}
                        />

                        {/* Weight */}
                        {parcelType === "non-document" && (
                            <input
                                type="number"
                                className="input input-bordered"
                                placeholder="Weight (kg)"
                                {...register("weight")}
                            />
                        )}
                    </div>
                </div>

                {/* SENDER + RECEIVER */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Sender */}
                    <div className="bg-base-200 p-6 rounded-xl">
                        <h3 className="text-xl font-semibold mb-6">Sender Info</h3>
                        <div className="space-y-4">
                            <input
                                defaultValue={user?.displayName}
                                className="input input-bordered w-full"
                                placeholder="Sender Name"
                                {...register("senderName", { required: true })}
                            />
                            <input
                                className="input input-bordered w-full"
                                placeholder="Contact"
                                {...register("senderContact", { required: true })}
                            />
                            <select
                                className="select select-bordered w-full"
                                {...register("senderRegion", { required: true })}
                            >
                                <option value="">Select Region</option>
                                {regions.map((region, i) => (
                                    <option key={i} value={region}>{region}</option>
                                ))}
                            </select>
                            <select
                                className="select select-bordered w-full"
                                {...register("senderDistrict", { required: true })}
                            >
                                <option value="">Select District</option>
                                {senderDistricts.map((d, i) => (
                                    <option key={i} value={d.district}>{d.district}</option>
                                ))}
                            </select>
                            <select
                                className="select select-bordered w-full"
                                {...register("senderCenter", { required: true })}
                            >
                                <option value="">Service Center</option>
                                {senderCenters.map((c, i) => (
                                    <option key={i} value={c}>{c}</option>
                                ))}
                            </select>
                            <input
                                className="input input-bordered w-full"
                                placeholder="Address"
                                {...register("senderAddress", { required: true })}
                            />
                            <textarea
                                className="textarea textarea-bordered w-full"
                                placeholder="Pickup Instruction"
                                {...register("pickupInstruction", { required: true })}
                            />
                        </div>
                    </div>

                    {/* Receiver */}
                    <div className="bg-base-200 p-6 rounded-xl">
                        <h3 className="text-xl font-semibold mb-6">Receiver Info</h3>
                        <div className="space-y-4">
                            <input
                                className="input input-bordered w-full"
                                placeholder="Receiver Name"
                                {...register("receiverName", { required: true })}
                            />
                            <input
                                className="input input-bordered w-full"
                                placeholder="Contact"
                                {...register("receiverContact", { required: true })}
                            />
                            <select
                                className="select select-bordered w-full"
                                {...register("receiverRegion", { required: true })}
                            >
                                <option value="">Select Region</option>
                                {regions.map((region, i) => (
                                    <option key={i} value={region}>{region}</option>
                                ))}
                            </select>
                            <select
                                className="select select-bordered w-full"
                                {...register("receiverDistrict", { required: true })}
                            >
                                <option value="">Select District</option>
                                {receiverDistricts.map((d, i) => (
                                    <option key={i} value={d.district}>{d.district}</option>
                                ))}
                            </select>
                            <select
                                className="select select-bordered w-full"
                                {...register("receiverCenter", { required: true })}
                            >
                                <option value="">Service Center</option>
                                {receiverCenters.map((c, i) => (
                                    <option key={i} value={c}>{c}</option>
                                ))}
                            </select>
                            <input
                                className="input input-bordered w-full"
                                placeholder="Address"
                                {...register("receiverAddress", { required: true })}
                            />
                            <textarea
                                className="textarea textarea-bordered w-full"
                                placeholder="Delivery Instruction"
                                {...register("deliveryInstruction", { required: true })}
                            />
                        </div>
                    </div>
                </div>

                {/* LIVE COST */}
                <div className="text-center text-xl font-semibold">
                    Delivery Cost: <span className="text-primary bg-amber-800 p-2">{cost} BDT</span>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="text-center">
                    <button type="submit" className="btn text-black btn-primary px-10">
                        Submit Parcel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SendParcel;