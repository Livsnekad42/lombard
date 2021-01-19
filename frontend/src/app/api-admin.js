import http from "./settings/axios";

const user = JSON.parse(localStorage.getItem('user'));
if ( !!user && !!user.token ) {
    setHeaderAuthorization(user.token);
}

/**
 *
 * @param {object} data
 * @returns {Promise<void>}
 */
export const getAllCities = async data =>
  await http.get("/map/all-city-location", data);

/**
 *
 * @param {object} data
 * @returns {Promise<void>}
 */
export const addCities = async data =>
  await http.post("/map/add-city-location", data);

/**
 *
 * @param {object} data
 * @returns {Promise<void>}
 */
export const destroyCities = async data =>
  await http.post("/map/destroy-city-location", data);

/**
 *
 * @param {object} data
 * @returns {Promise<void>}
 */
export const editCities = async data =>
  await http.post("/map/edit-city-location", data);

/**
 *
 * @param {object} data
 * @returns {Promise<void>}
 */
export const addAffiliate = async data =>
  await http.post("/map/add-affiliate-location/", data);

/**
 *
 * @param {string} cityId
 * @returns {Promise<void>}
 */
export const getAffiliate = async cityId =>
  await http.get(`/map/city-affiliate-location/${cityId}`);

/**
 *
 * @param {object} data
 * @returns {Promise<void>}
 */
export const editAffiliate = async data =>
  await http.post("/map/edit-affiliate-location/", data);

/**
 *
 * @param {object} id
 * @returns {Promise<void>}
 */
export const destroyAffiliate = async id =>
  await http.get(`/map/destroy-affiliate-location/${id}`);

/**
 *
 * @param data
 * @returns {Promise<*>}
 */
export const signInAdminPanelApi = data =>
  http.post("/auth/sign-in-admin", data);

export const getListDocument = async data =>
    await http.get("/media/documentList");

export const addDocument = async data =>
    await http.post("/media/create-document", data);

export const delDocument = async data =>
    await http.post("/media/destroy-document", data);

export const getListComment = async () =>
    await http.get("/comments/commentList");

export const addComment = async data =>
    await http.post("/comments/create-comment", data);

export const delComment = async data =>
    await http.post("/comments/destroy-comment", data);

export const editComment = async data =>
    await http.post("/comments/edit-comment", data);

export function setHeaderAuthorization(token) {
    http.defaults.headers.common["Authorization"] = `Auth ${token}`;
};

export function removeHeaderAuthorization() {
    delete http.defaults.headers.common["Authorization"];
};


export const createSettings = async data =>
    await http.post("/settings/create-setting", data);

export const getSettings = async data =>
    await http.post("/settings/settings");

export const editSetting = async data =>
    await http.post("/settings/edit-setting", data);

export const delSetting = async data =>
    await http.post("/settings/destroy-setting", data);