import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';


const CoverageMap = ({ serviceCentres }) => {
    // Bangladesh center location
    const position = [23.6850, 90.3563];

    return (
        <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg">
            <MapContainer
                center={position}
                zoom={7}
                scrollWheelZoom={true}
                className="h-full w-full"
            >
                <TileLayer
                    attribution='© OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Example marker */}
                {
                    serviceCentres.map((center, index) =>
                        <Marker
                            key={index}
                            position={[center.latitude, center.longitude]}>
                            <Popup>We are available accross Bangladesh
                            </Popup>
                        </Marker>
                    )
                }
                {/* 
                <Marker position={[23.8103, 90.4125]}>
                    <Popup>
                        Dhaka District <br /> Parcel Delivery Available
                    </Popup>
                </Marker> */}
            </MapContainer>
        </div>
    );
};

export default CoverageMap;