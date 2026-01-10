import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

type MapItem = {
  id: number;
  title: string;
  category: "problem" | "event";
  lat: number;
  lng: number;
};

const ITEMS: MapItem[] = [
  {
    id: 1,
    title: "Kátyú az úton",
    category: "problem",
    lat: 47.4979,
    lng: 19.0402,
  },
  {
    id: 2,
    title: "Utcai koncert",
    category: "event",
    lat: 47.4925,
    lng: 19.0513,
  },
];

const icons = {
  problem: new L.Icon({
    iconUrl: "/icons/red-pin.svg",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),
  event: new L.Icon({
    iconUrl: "/icons/blue-pin.svg",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),
};

export default function MapView() {
  const [filters, setFilters] = useState({
    problem: true,
    event: true,
  });

  const filteredItems = ITEMS.filter(
    (item) => filters[item.category]
  );

  return (
    <div>
      <div>
        <h3>Szűrés</h3>

        <label>
          <input
            type="checkbox"
            checked={filters.problem}
            onChange={(e) =>
              setFilters({ ...filters, problem: e.target.checked })
            }
          />
          Probléma bejelentések
        </label>
        <br />

        <label>
          <input
            type="checkbox"
            checked={filters.event}
            onChange={(e) =>
              setFilters({ ...filters, event: e.target.checked })
            }
          />
          Események
        </label>
      </div>

      <div style={{ height: "500px", width: "100%" }}>
        <MapContainer
          center={[47.4979, 19.0402]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredItems.map((item) => (
            <Marker
              key={item.id}
              position={[item.lat, item.lng]}
              icon={icons[item.category]}
            >
              <Popup>{item.title}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
