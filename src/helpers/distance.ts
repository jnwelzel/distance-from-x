/**
 * Calculates the distance between 2 geographic coordinates using the Haversine formula.
 * @param lat1 Latitude of the first coordinate
 * @param lon1 Longitude of the first coordinate
 * @param lat2 Latitude of the second coordinate
 * @param lon2 Longitude of the second coordinate
 * @returns The calculated distance in kilometers.
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  try {
    const toRadians = (degrees: number) => degrees * (Math.PI / 180);

    const R = 6371; // Radius of the Earth in kilometers
    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = toRadians(lat2 - lat1);
    const Δλ = toRadians(lon2 - lon1);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // Distance in kilometers

    return parseFloat(d.toFixed(2));
  } catch (error) {
    console.error("Error when calculating distance", error);
    return 0.0;
  }
};
