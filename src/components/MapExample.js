import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export default function Map() {
    const mapStyles = {
        height: '100%',
        width: '100%',
        borderRadius: '12px',
    };

    const defaultCenter = {
        lat: 40.748817,
        lng: -73.985428,
    };

    return (
        <>
            <div
                className="relative w-full rounded-xl shadow"
                style={{ height: '600px' }}
            >
                <LoadScript googleMapsApiKey="AIzaSyCN5RsuQUGXEAd3TqNpEkHygtmhFxNiDZk">
                    <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={13}
                        center={defaultCenter}
                    >
                        <Marker key="location" position={defaultCenter} />
                    </GoogleMap>
                </LoadScript>
            </div>
        </>
    );
}
