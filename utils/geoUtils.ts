export const getSquareCoordinates = (
  lat: number,
  lon: number,
  radius: number
): [number, number, number, number] => {
  const earthRadius = 6371e3; // Radius of the Earth in meters
  const latRadian = (lat * Math.PI) / 180; // Convert latitude to radians
  const lonRadian = (lon * Math.PI) / 180; // Convert longitude to radians

  // Calculate the change in latitude and longitude in radians
  const dLat = (radius / earthRadius) * (180 / Math.PI);
  const dLon = ((radius / earthRadius) * (180 / Math.PI)) / Math.cos(latRadian);

  // Calculate the square coordinates
  const minLat = lat - dLat;
  const maxLat = lat + dLat;
  const minLon = lon - dLon;
  const maxLon = lon + dLon;

  return [minLat, minLon, maxLat, maxLon];
};
