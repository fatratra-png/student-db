const BASE_URL = "http://localhost:3000";

const getToken = () => localStorage.getItem("token");

const headers = () => ({
  "Content-Type": "application/json",
  "X-API-Key": import.meta.env.VITE_API_KEY,
  ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
});

const handleResponse = async (res) => {
  const body = await res.json();
  if (!res.ok) {
    throw new Error(body.message || "Error");
  }
  return body;
};

export const login = async (credentials) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(credentials),
  });
  return handleResponse(res);
};

export const register = async (credentials) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(credentials),
  });
  return handleResponse(res);
};

export const getStudents = async () => {
  const res = await fetch(`${BASE_URL}/students`, { headers: headers() });
  return (await handleResponse(res)).data;
};

export const getStats = async () => {
  const res = await fetch(`${BASE_URL}/students/stats`, { headers: headers() });
  return (await handleResponse(res)).data;
};

export const createStudent = async (student) => {
  const res = await fetch(`${BASE_URL}/students`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(student),
  });
  return (await handleResponse(res)).data;
};
