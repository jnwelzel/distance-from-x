const API_KEY = "AIzaSyBpDsSsGM3OqVg_mAaHN_JOBkCkHR5VQvI";

interface GeocodeResponse {
  lat?: string;
  lon?: string;
  error?: string;
}

export const fetchCoordinatesFromAddress = async (
  searchValue: string
): Promise<GeocodeResponse> => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchValue)}&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK") {
      const location = data.results[0].geometry.location;
      return { lat: location.lat, lon: location.lng };
    } else {
      return {
        error: `Geocoding API error: ${data.status}`,
      };
    }
  } catch (e) {
    return { error: `Error fetching data from Geocoding API: ${e}` };
  }
};
