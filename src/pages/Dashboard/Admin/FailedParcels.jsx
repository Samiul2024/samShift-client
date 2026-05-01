import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const FailedParcels = () => {

    const axiosSecure = useAxiosSecure();

    const {
        data: parcels = [],
        isLoading
    } = useQuery({
        queryKey: ["failedParcels"],
        queryFn: async () => {

            const res = await axiosSecure.get("/parcels/failed");

            return res.data;
        }
    });

    if (isLoading) {
        return <p className="p-6">Loading failed parcels...</p>;
    }

    return (
        <div className="p-6">

            <h2 className="text-3xl font-bold mb-6">
                ❌ Failed Deliveries
            </h2>

            {
                parcels.length === 0 ? (
                    <p>No failed parcels found</p>
                ) : (

                    <div className="overflow-x-auto">

                        <table className="table">

                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Parcel</th>
                                    <th>Route</th>
                                    <th>Rider</th>
                                    <th>Reason</th>
                                    <th>Failed At</th>
                                </tr>
                            </thead>

                            <tbody>

                                {
                                    parcels.map((parcel, index) => (

                                        <tr key={parcel._id}>

                                            <td>{index + 1}</td>

                                            <td>
                                                {parcel.title}
                                            </td>

                                            <td>
                                                {parcel.senderDistrict}
                                                →
                                                {parcel.receiverDistrict}
                                            </td>

                                            <td>
                                                {parcel.assigned_rider_name}
                                            </td>

                                            <td>
                                                <span className="badge badge-error">
                                                    {parcel.fail_reason}
                                                </span>
                                            </td>

                                            <td>
                                                {
                                                    new Date(
                                                        parcel.failed_at
                                                    ).toLocaleString()
                                                }
                                            </td>

                                        </tr>
                                    ))
                                }

                            </tbody>

                        </table>

                    </div>
                )
            }

        </div>
    );
};

export default FailedParcels;