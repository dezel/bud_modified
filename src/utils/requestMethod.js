import axios from "axios";
import { tryParse } from "./tryParse";

const BASE_URL = "http://localhost:8000";

let TOKEN;

const user = tryParse(localStorage.getItem("currentUser"));
try {
  if (user.id) {
    TOKEN = user.accessToken;
  }
} catch (err) {
  localStorage.setItem("currentUser", "{}");
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
