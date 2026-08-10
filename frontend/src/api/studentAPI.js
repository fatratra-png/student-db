const BASE_URL = "http://localhost:3000/students";
async function handleResponse(res) {
  const body = await res.json();
  if (!res.ok) {
    throw new Error(body.message || "Error");
  }
  return body.data;
}
export async function getStudents() {
  const res = await fetch(BASE_URL);
  return handleResponse(res);
}

export async function createStudent(student) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
  return handleResponse(res);
}
