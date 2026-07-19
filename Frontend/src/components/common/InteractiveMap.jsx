import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Search, MapPin, Navigation, Loader2 } from "lucide-react";

// Fix for default marker icons in Leaflet when bundled
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const InteractiveMap = ({ destinationAddress, destinationName }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const routeLayer = useRef(null);
  const markers = useRef([]);
  
  const [startQuery, setStartQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [routeInfo, setRouteInfo] = useState(null); // { distance, duration }
  const [destCoords, setDestCoords] = useState(null); // [lat, lng]

  // 1. Geocode destination address on mount
  useEffect(() => {
    const geocodeDest = async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destinationAddress)}&limit=1`;
        const res = await fetch(url);
        const data = await res.json();
        
        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lng = parseFloat(data[0].lon);
          setDestCoords([lat, lng]);
        } else {
          // Fallback to Pune center
          setDestCoords([18.5204, 73.8567]);
        }
      } catch (err) {
        setDestCoords([18.5204, 73.8567]);
      }
    };
    geocodeDest();
  }, [destinationAddress]);

  // 2. Initialize Map once coords are available
  useEffect(() => {
    if (!destCoords || !mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: false,
    }).setView(destCoords, 14);
    mapInstance.current = map;

    // Add gold-sepia filtered tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Zoom controls at bottom-right
    L.control.zoom({ position: "bottomright" }).addTo(map);

    // Venue Marker
    const venueMarker = L.marker(destCoords)
      .addTo(map)
      .bindPopup(`<b>${destinationName}</b><br/>${destinationAddress}`)
      .openPopup();
    markers.current.push(venueMarker);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [destCoords]);

  // 3. Geocode start location & calculate route
  const handleGetRoute = async (e) => {
    e.preventDefault();
    if (!startQuery.trim() || !destCoords) return;

    setLoading(true);
    setRouteInfo(null);

    // Clear previous routes/markers except venue
    if (routeLayer.current) {
      mapInstance.current.removeLayer(routeLayer.current);
    }
    if (markers.current.length > 1) {
      markers.current.slice(1).forEach(m => mapInstance.current.removeLayer(m));
      markers.current = [markers.current[0]];
    }

    try {
      // Step A: Geocode start location
      const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(startQuery)}&limit=1`;
      const geoRes = await fetch(geoUrl);
      const geoData = await geoRes.json();

      if (!geoData || geoData.length === 0) {
        alert("Starting location not found. Please try another search term.");
        setLoading(false);
        return;
      }

      const startLat = parseFloat(geoData[0].lat);
      const startLng = parseFloat(geoData[0].lon);
      const startCoords = [startLat, startLng];

      // Add Start Marker
      const startMarker = L.marker(startCoords)
        .addTo(mapInstance.current)
        .bindPopup(`<b>Starting Point</b><br/>${geoData[0].display_name}`)
        .openPopup();
      markers.current.push(startMarker);

      // Step B: Calculate driving route via OSRM
      const routeUrl = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${destCoords[1]},${destCoords[0]}?overview=full&geometries=geojson`;
      const routeRes = await fetch(routeUrl);
      const routeData = await routeRes.json();

      if (routeData && routeData.routes && routeData.routes.length > 0) {
        const route = routeData.routes[0];
        
        // Extract distance & duration
        const distanceKm = (route.distance / 1000).toFixed(1);
        const durationMins = Math.round(route.duration / 60);
        setRouteInfo({ distance: distanceKm, duration: durationMins });

        // Draw Polyline
        const coordinates = route.geometry.coordinates.map(coord => [coord[1], coord[0]]);
        const polyline = L.polyline(coordinates, {
          color: "#fcd34d", // Gold line
          weight: 4,
          opacity: 0.8,
          lineJoin: "round"
        }).addTo(mapInstance.current);
        routeLayer.current = polyline;

        // Fit map bounds to show full route
        const bounds = L.latLngBounds(markers.current.map(m => m.getLatLng()));
        mapInstance.current.fitBounds(bounds, { padding: [40, 40] });
      }
    } catch (err) {
      console.error(err);
      alert("Error generating route. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-3.5">
      {/* Map view container */}
      <div 
        ref={mapRef} 
        className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden relative shadow-inner border border-amber-500/15"
        style={{
          // Apply custom golden-sepia theme filter on top of tile layer
          filter: "sepia(80%) saturate(140%) hue-rotate(340deg) brightness(85%) contrast(90%)"
        }}
      />

      {/* Start search field */}
      <form onSubmit={handleGetRoute} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            required
            value={startQuery}
            onChange={(e) => setStartQuery(e.target.value)}
            placeholder="Enter starting point / तुमचे ठिकाण टाका"
            className="w-full pl-9 pr-3 py-2.5 border border-amber-500/20 rounded-xl bg-[#310202] text-xs font-serif text-amber-100 placeholder:text-amber-200/35 focus:outline-none focus:border-amber-400"
          />
          <MapPin size={12} className="absolute left-3 top-3.5 text-amber-400/60" />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-700 text-[#540303] rounded-xl font-bold flex items-center justify-center cursor-pointer border-0 text-xs gap-1 shadow-md transition-all shrink-0"
        >
          {loading ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            <Navigation size={12} />
          )}
          <span>Get Route</span>
        </button>
      </form>

      {/* Route distance/duration info */}
      {routeInfo && (
        <div className="p-3 bg-[#310202] border border-amber-500/15 rounded-xl flex justify-around text-center text-xs font-serif">
          <div>
            <span className="block text-[10px] text-amber-400/70 uppercase tracking-wider">Distance</span>
            <span className="font-bold text-amber-100">{routeInfo.distance} km</span>
          </div>
          <div className="w-[1px] bg-amber-500/15" />
          <div>
            <span className="block text-[10px] text-amber-400/70 uppercase tracking-wider">Travel Time</span>
            <span className="font-bold text-amber-100">{routeInfo.duration} mins</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
