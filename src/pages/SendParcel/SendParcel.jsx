import { useLoaderData } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const generateTrackingID = () => {
    const date = new Date();
    const datePart = date.toISOString().split("T")[0].replace(/-/g, "");
    const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `PCL-${datePart}` - ${ rand }
};

const SendParcel = ({ user }) => {
    const districtsData = useLoaderData();
    const { register, handleSubmit, watch, reset } = useForm();
    const { user } = useAuth()

    const [cost, setCost] = useState(0);

    // ---------------- WATCH ----------------
    const parcelType = watch("type");
    const weight = watch("weight");

    const senderRegion = watch("senderRegion");
    const senderDistrict = watch("senderDistrict");

    const receiverRegion = watch("receiverRegion");
    const receiverDistrict = watch("receiverDistrict");

    // ---------------- REGIONS ----------------
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
        if (!parcelType || !senderDistrict || !receiverDistrict) return;

        let deliveryCost = 0;
        const insideDistrict = senderDistrict === receiverDistrict;

        if (parcelType === "document") {
            deliveryCost = insideDistrict ? 60 : 80;
        } else {
            const w = parseFloat(weight) || 0;

            if (w <= 3) {
                deliveryCost = insideDistrict ? 110 : 150;
            } else {
                const extraWeight = w - 3;

                if (insideDistrict) {
                    deliveryCost = 110 + extraWeight * 40;
                } else {
                    deliveryCost = 150 + extraWeight * 40 + 40;
                }
            }
        }

        setCost(deliveryCost);
    }, [parcelType, weight, senderDistrict, receiverDistrict]);

    // ---------------- SUBMIT ----------------
    const onSubmit = (data) => {
        const insideDistrict = data.senderDistrict === data.receiverDistrict;
        const w = parseFloat(data.weight) || 0;

        let breakdown = "";
        let base = 0;
        let extra = 0;

        if (data.type === "document") {
            base = insideDistrict ? 60 : 80;

            breakdown = `
                <p>📄 <b>Parcel Type:</b> Document</p>
                <p>📍 <b>Delivery:</b> ${insideDistrict ? "Inside District" : "Outside District"}</p>
                <p>💰 <b>Base Cost:</b> ${base} BDT</p>
            `;
        } else {
            if (w <= 3) {
                base = insideDistrict ? 110 : 150;

                breakdown = `
                    <p>📦 <b>Parcel Type:</b> Non-Document</p>
                    <p>⚖️ <b>Weight:</b> ${w} kg</p>
                    <p>📍 <b>Delivery:</b> ${insideDistrict ? "Inside District" : "Outside District"}</p>
                    <p>💰 <b>Base Cost (≤3kg):</b> ${base} BDT</p>
                `;
            } else {
                const extraWeight = w - 3;
                const perKgRate = 40;
                extra = extraWeight * perKgRate;
                base = insideDistrict ? 110 : 150;

                breakdown = `
    <p>📦 <b>Parcel Type:</b> Non-Document</p>
    <p>⚖️ <b>Total Weight:</b> ${w} kg</p>
    <p>📍 <b>Delivery:</b> ${insideDistrict ? "Inside District" : "Outside District"}</p>

    <hr/>

    <p>💰 <b>Base Cost (First 3kg):</b> ${base} BDT</p>

    <p>➕ <b>Extra Weight:</b> ${extraWeight.toFixed(2)} kg</p>
    <p>➕ <b>Rate:</b> ${perKgRate} BDT per kg</p>
    <p>➕ <b>Extra Cost:</b> ${extraWeight.toFixed(2)} × ${perKgRate} = ${extra} BDT</p>

    ${!insideDistrict ? `<p>🚚 <b>Outside District Charge:</b> 40 BDT</p>` : ""}
`;
            }
        }

        Swal.fire({
            title: "📦 Delivery Cost Breakdown",
            html: `
                <div style="text-align:left; line-height:1.8">
                    ${breakdown}
                    <hr/>
                    <h2 style="color:#16a34a; text-align:center;">
                        Total: ${cost} BDT
                    </h2>
                </div>
            `,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Proceed to Payment 💳",
            cancelButtonText: "Edit Parcel ✏️",
            confirmButtonColor: "#22c55e",
            cancelButtonColor: "#ef4444",
        }).then((result) => {
            if (result.isConfirmed) {
                confirmSubmission(data);
            }
        });
    };

    // ---------------- FINAL CONFIRM ----------------
    const confirmSubmission = (data) => {
        const parcelData = {
            ...data,
            delivery_cost: cost,
            created_by: user.email,
            payment_status='unpaid',
            delivery_status: "not-collected",
            creation_date: new Date().toISOString(),
            tracking_id: generateTrackingID(),
        };

        console.log("Parcel Data:", parcelData);

        Swal.fire({
            icon: "success",
            title: "Parcel বুকিং সফল!",
            text: "Proceeding to payment...",
            timer: 2000,
            showConfirmButton: false,
        });

        reset();
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold">Send a Parcel</h2>
                <p className="text-gray-500">
                    Fill the form to schedule your parcel delivery
                </p>
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