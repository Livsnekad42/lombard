import Cookies from "js-cookie";
import { cookieKey } from "../../_config";
/**
 *
 * @param {string}key
 * @param {string}value
 */
export const setCookie = ({ key = cookieKey, value }) =>
  Cookies.set(key, value);

/**
 *
 * @param {string}key
 */
export const getCookie = (key = cookieKey) => Cookies.get(key);
/**
 *
 * @param {string}key
 */
export const cookieRemove = (key = cookieKey) => Cookies.remove(key);
