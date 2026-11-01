
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from "react-leaflet";

import { useEffect } from "react";
import PropTypes from "prop-types";
import L from "leaflet";

const markerIcon = new L.Icon({

  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",

  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",

  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",

  iconSize: [25, 41],
  iconAnchor: [12, 41]

});

function FitMarkers({ places }) {

  const map = useMap();

  useEffect(() => {

    if (places.length > 1) {

      map.fitBounds(
        places.map((p) => [p.lat, p.lng]),
        { padding: [35, 35], maxZoom: 5 }
      );

    } else if (places.length === 1) {

      map.setView(
        [places[0].lat, places[0].lng],
        5
      );

    }

  }, [places, map]);

  return null;
}

FitMarkers.propTypes = {
  places: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired
    })
  ).isRequired
};

export default function MapPanel({ places }) {

  return (

    <div className="map-wrap">

      <MapContainer
        center={[22, 75]}
        zoom={2}
        scrollWheelZoom={false}
        className="map"
      >

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitMarkers places={places} />

        {places.map((place) => (

          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={markerIcon}
          >

            <Popup>
              <strong>{place.name}</strong>
              <br />
              {place.country}
              <br />
              ₹ {place.cost.toLocaleString("en-IN")}
            </Popup>

          </Marker>

        ))}

      </MapContainer>

    </div>

  );
}

MapPanel.propTypes = {
  places: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      cost: PropTypes.number.isRequired
    })
  ).isRequired
};
