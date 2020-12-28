import http from "./settings/axios";
import { getCookie } from "../app/settings/token";

export const authorized = async data =>
  await http.get("/auth/start-incoming", data);

export const getLoan = async data =>
  await http.post("/loan/getCurrentLoan", data, {
    headers: { "X-Requested-With": "_bck" }
  });
export const getCurrentOverdraftSmsCode = async data =>
  await http.post("/loan/currentOverdraftSmsCode", data, {
    headers: { "X-Requested-With": "_bck" }
  });
export const getCurrentOverdraftWithCodeSMS = async data =>
  await http.post("/loan/currentOverdraftWithCodeSMS", data, {
    headers: { "X-Requested-With": "_bck" }
  });

export const createProlongation = async data =>
  await http.post("/loan/createProlongations", data, {
    headers: { "X-Requested-With": "_bck" }
  });

export const startTransactions = async data =>
  await http.post("/loan/startTransactions", data);

export const getProcessingStatus = async data =>
  await http.post("/loan/checkStatus", data, {
    headers: { "X-Requested-With": "_bck" } // getCookie()
  });
