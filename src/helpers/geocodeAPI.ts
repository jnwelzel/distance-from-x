const API_KEY = "AIzaSyBpDsSsGM3OqVg_mAaHN_JOBkCkHR5VQvI";

interface GeocodeResponse {
  lat?: string;
  lon?: string;
  formattedAddress?: "";
  error?: string;
}

const getGeocodeData = async (url: string): Promise<GeocodeResponse> => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK") {
      const { geometry, formatted_address } = data.results[0];
      return {
        lat: geometry.location.lat,
        lon: geometry.location.lng,
        formattedAddress: formatted_address,
      };
    } else {
      return {
        error: `Geocoding API error: ${data.status}`,
      };
    }
  } catch (e) {
    return { error: `Error fetching data from Geocoding API: ${e}` };
  }
};

export const fetchCoordinatesFromAddress = async (searchValue: string) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchValue)}&key=${API_KEY}`;

  return getGeocodeData(url);
};

export const fetchAddressFromCoordinates = async (lat: number, lon: number) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(`${lat},${lon}`)}&key=${API_KEY}`;

  return getGeocodeData(url);
};
