import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/"
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getTasks = (page = 1) => API.get(`tasks/?page=${page}`);
export const createTask = (task) => API.post("tasks/", task);
export const deleteTask = (id) => API.delete(`tasks/${id}/`);
export const login = (username, password) =>
  axios.post("http://localhost:8000/api/token/", { username, password });