import { useState } from "react";
import { useForm } from "react-hook-form";

const PricingCalculator = () => {

    const { register, handleSubmit, reset } = useForm();
    const [price, setPrice] = useState(50);

    const onSubmit = (data) => {
        const { parcelType, destination, weight } = data;

        let cost = 50;

        if (parcelType === "document") cost += 0;
        if (parcelType === "package") cost += 20;

        if (destination === "inside") cost += 0;
        if (destination === "outside") cost += 40;

        if (weight) cost += weight * 10;

        setPrice(cost);
    };

    const handleReset = () => {
        reset();
        setPrice(50);
    };

    return (
        <section className="bg-base-200 rounded-3xl p-12 my-20">

            {/* Title */}
            <div className="mb-10">
                <h2 className="text-4xl font-bold mb-3">
                    Pricing Calculator
                </h2>

                <p className="max-w-xl text-gray-500">
                    Enjoy fast, reliable parcel delivery with real-time tracking and
                    zero hassle. From personal packages to business shipments — we
                    deliver on time, every time.
                </p>
            </div>

            <div className="divider"></div>

            <h3 className="text-2xl font-semibold text-center mb-10">
                Calculate Your Cost
            </h3>

            <div className="grid md:grid-cols-2 gap-16 items-center">

                {/* FORM */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6 max-w-md"
                >
                    {/* Parcel Type */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Parcel type</span>
                        </label>

                        <select
                            {...register("parcelType")}
                            className="select select-bordered w-full"
                        >
                            {/* <option value="">Select Parcel type</option> */}
                            <option value="document">Document</option>
                            <option value="package">Package</option>
                        </select>
                    </div>

                    {/* Destination */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Delivery Destination</span>
                        </label>

                        <select
                            {...register("destination")}
                            className="select select-bordered w-full"
                        >
                            {/* <option value="">Select Delivery Destination</option> */}
                            <option value="inside">Inside City</option>
                            <option value="outside">Outside City</option>
                        </select>
                    </div>

                    {/* Weight */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Weight (KG)</span>
                        </label>

                        <input
                            type="number"
                            step="0.1"
                            {...register("weight")}
                            placeholder="Enter weight"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-3">
                        <button
                            type="button"
                            onClick={handleReset}
                            className="btn btn-outline btn-success w-32"
                        >
                            Reset
                        </button>

                        <button
                            type="submit"
                            className="btn btn-success flex-1"
                        >
                            Calculate
                        </button>
                    </div>
                </form>

                {/* RESULT */}
                <div className="flex justify-center items-center">
                    <h1 className="text-7xl font-extrabold">
                        {price} Tk
                    </h1>
                </div>

            </div>
        </section>
    );
};

export default PricingCalculator;