import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useState } from "react";
import 'leaflet/dist/leaflet.css';


// component to move map
const FlyToLocation = ({ location }) => {
    const map = useMap();

    if (location) {
        map.flyTo([location.latitude, location.longitude], 12);
    }

    return null;
};


const CoverageMap = ({ serviceCentres }) => {

    const position = [23.6850, 90.3563];

    const [search, setSearch] = useState("");
    const [selectedLocation, setSelectedLocation] = useState(null);


    const handleSearch = (value) => {

        setSearch(value);

        const found = serviceCentres.find(center =>
            center.district.toLowerCase().includes(value.toLowerCase())
        );

        setSelectedLocation(found);
    };


    return (
        <div className="w-full">

            {/* 🔍 SEARCH BOX */}
            <div className="flex justify-center mb-6">

                <input
                    type="text"
                    placeholder="Search district"
                    className="input input-bordered w-96"
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                />

            </div>


            {/* MAP */}
            <div className="w-full h-[800px] rounded-xl overflow-hidden shadow-lg">

                <MapContainer
                    center={position}
                    zoom={8}
                    scrollWheelZoom={true}
                    className="h-full w-full"
                >

                    <TileLayer
                        attribution='© OpenStreetMap contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* move map to searched district */}
                    <FlyToLocation location={selectedLocation} />


                    {/* markers */}
                    {
                        serviceCentres.map((center, index) =>
                            <Marker
                                key={index}
                                position={[center.latitude, center.longitude]}>

                                <Popup>
                                    <strong>
                                        {center.district} <br />
                                        {center.covered_area.join(', ')}
                                    </strong>
                                </Popup>

                            </Marker>
                        )
                    }

                </MapContainer>

            </div>
        </div>
    );
};

export default CoverageMap;