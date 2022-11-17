import axios from "axios";
import { server } from "../constants/data";


export const publicRequest = axios.create({
  baseURL: server,
});

// export const userRequest = axios.create({
//   baseURL: BASE_URL,
//   header: { token: `Bearer ${TOKEN}` },
// });