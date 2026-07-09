import axiosInstance from "./axiosInstance";

export const getSnippets = (params) =>
  axiosInstance.get("/snippets", { params });

export const getSnippetById = (id) => axiosInstance.get(`/snippets/${id}`);

export const createSnippet = (data) => axiosInstance.post("/snippets", data);

export const updateSnippet = (id, data) =>
  axiosInstance.put(`/snippets/${id}`, data);

export const deleteSnippet = (id) => axiosInstance.delete(`/snippets/${id}`);

export const toggleFavorite = (id) =>
  axiosInstance.patch(`/snippets/${id}/favorite`);