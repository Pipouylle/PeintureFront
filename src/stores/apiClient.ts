import axios from "axios";

export const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        "Content-Type": "application/ld+json",
    }
});

export const apiClientPatch = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        "Content-Type": "application/merge-patch+json",
    }
})