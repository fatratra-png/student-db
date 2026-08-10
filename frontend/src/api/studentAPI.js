const BASE_URL = "http://localhost:3000/students";

export async function getStudents() {
  const res = await fetch(BASE_URL);
  const body = await res.json();
  if (!res.ok) {
    throw new Error(body.message);
  }
  return body.data;
}
