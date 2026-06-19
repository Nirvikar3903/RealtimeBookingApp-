import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useGeolocation = (enabled = true) => {
  const [locationName, setLocationName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use OpenStreetMap Nominatim for free reverse geocoding
  const fetchCityName = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      
      const address = response.data.address;
      // Extract city or most relevant locality (excluding state/county to ensure pure city names)
      const city = address.city || address.town || address.municipality || address.city_district || address.village || address.suburb || "Unknown Location";
      
      setLocationName(city);
      // Save to localStorage so we don't have to fetch it every time
      localStorage.setItem("sms_user_location", city);
    } catch (err) {
      console.error("Reverse geocoding failed:", err);
      setError("Failed to resolve location name.");
    }
  };

  const handleSuccess = useCallback(async (position) => {
    const { latitude, longitude } = position.coords;
    await fetchCityName(latitude, longitude);
    setLoading(false);
  }, []);

  const handleError = useCallback((error) => {
    setError(error.message || "Location access denied.");
    setLoading(false);
  }, []);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
  };

  // Automatically request location when the app loads
  useEffect(() => {
    if (!enabled) return;

    const cachedLocation = localStorage.getItem("sms_user_location");
    if (cachedLocation) {
      setLocationName(cachedLocation);
      return;
    }

    // Unconditionally request location to prompt the user
    requestLocation();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return { locationName, loading, error, requestLocation };
};

export default useGeolocation;
