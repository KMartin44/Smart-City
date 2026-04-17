import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type Event = {
  id: number;
  title: string;
  latitude: number;
  longitude: number;
};

type Issue = {
  id: number;
  title: string;
  latitude: number;
  longitude: number;
  is_done: boolean;
};

type MapItem = {
  id: number;
  title: string;
  category: "issue" | "event";
  lat: number;
  lng: number;
};

const icons = {
  issue: new L.Icon({
    iconUrl: "/icons/circle-alert.svg",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -35]
  }),
  event: new L.Icon({
    iconUrl: "/icons/calendar.svg",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -35]
  }),
};

export default function MapView() {
  const [events, setEvents] = useState<Event[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    issue: true,
    event: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, issuesRes] = await Promise.all([
          fetch("/api/events", {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }),
          fetch("/api/issues", {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }),
        ]);

        if (!eventsRes.ok || !issuesRes.ok) {
          throw new Error("Hiba az API válaszban");
        }

        const eventsData = await eventsRes.json();
        const issuesData = await issuesRes.json();

        setEvents(eventsData);
        setIssues(issuesData);
      } catch (error) {
        console.error("Hiba adatlekéréskor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const items: MapItem[] = useMemo(() => {
    return [
      ...events.map((e) => ({
        id: e.id,
        title: e.title,
        category: "event" as const,
        lat: e.latitude,
        lng: e.longitude,
      })),
      ...issues
      .filter((i) => !i.is_done)
      .map((i) => ({
        id: i.id,
        title: i.title,
        category: "issue" as const,
        lat: i.latitude,
        lng: i.longitude,
      })),
    ];
  }, [events, issues]);

  const filteredItems = items.filter(
    (item) => filters[item.category]
  );

  if (loading) {
    return <div>Betöltés...</div>;
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Szűrés</CardTitle>
        </CardHeader>
        <CardContent>

          <div>
            <Checkbox
              id="issue"
              checked={filters.issue}
              onCheckedChange={(checked: boolean) =>
                setFilters({ ...filters, issue: !!checked })
              }
            />
            <Label htmlFor="issue">
              Probléma bejelentések
            </Label>
          </div>

          <div>
            <Checkbox
              id="event"
              checked={filters.event}
              onCheckedChange={(checked: boolean) =>
                setFilters({ ...filters, event: !!checked })
              }
            />
            <Label htmlFor="event">
              Események
            </Label>
          </div>

        </CardContent>
      </Card>

      <div className="h-[500px] w-full rounded-2xl overflow-hidden border mt-4">
        <MapContainer
          center={[47.4979, 19.0402]}
          zoom={13}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {filteredItems.map((item) => (
            <Marker
              key={`${item.category}-${item.id}`}
              position={[item.lat, item.lng]}
              icon={icons[item.category]}
            >
              <Popup>
                <strong>{item.title}</strong>
                <br />
                {item.category === "event" ? "Esemény" : "Probléma"}
              </Popup>
            </Marker>
          ))}

        </MapContainer>
      </div>
    </div>
  );
}