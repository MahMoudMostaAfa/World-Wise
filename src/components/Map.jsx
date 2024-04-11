import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import Button from "./Button";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../hooks/UseCitiesContext";
import { useGeolocation } from "../hooks/UseGeoLocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
function Map() {
  const { cities, getFlag } = useCities();
  const [mapPosition, setMapPosition] = useState([51.505, -0.29]);
  const {
    isLoading: isLoadingPosition,
    position: geolocationPostion,
    getPosition,
  } = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition();
  useEffect(
    function () {
      if (geolocationPostion) {
        setMapPosition([geolocationPostion.lat, geolocationPostion.lng]);
      }
    },
    [geolocationPostion]
  );
  useEffect(
    function () {
      if (mapLat && mapLng) {
        setMapPosition([mapLat, mapLng]);
      }
    },
    [mapLat, mapLng]
  );
  return (
    <div className={styles.mapContainer}>
      {!geolocationPostion && (
        <Button type={"position"} onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "use your position"}
        </Button>
      )}

      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={11}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          url=" https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{getFlag(city.emoji)}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const map = useMap();
  map.closePopup();
  map.setView(position);
  return null;
}
function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: function (e) {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}
export default Map;
