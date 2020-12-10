import axios from "axios";
import { mainUrl } from "../../_config";

export default axios.create({
  baseURL: mainUrl
});
