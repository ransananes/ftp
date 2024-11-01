import axios from "axios";
import { server } from "../constants/data";


export const publicRequest = axios.create({
  baseURL: server,
});
