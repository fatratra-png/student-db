const BASE_URL = "http://localhost:3000/students";
const handleResponse = async (res) => {
  const body = await res.json();
  if (!res.ok) {
    throw new Error(body.message || "Error");
  }
  return body.data;
};
export const getStudents = async () => {
  const res = await fetch(BASE_URL);
  return handleResponse(res);
};

export const createStudent = async (student) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
  return handleResponse(res);
};
