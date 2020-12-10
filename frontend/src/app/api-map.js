import http from "./settings/axios";

export const getAllCitiesAndAffiliate = async () =>
  await http.get("/map/all-city-location-and-affiliate");
