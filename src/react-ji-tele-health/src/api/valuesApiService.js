import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "https://localhost:44357/api/Values";

export function getPatients() {
  return fetch(`${baseUrl}/GetPatients`)
    .then(handleResponse)
    .catch(handleError);
}

export function getPatientById(id) {
  return fetch(`${baseUrl}/GetPatientById/${id}`)
    .then(handleResponse)
    .catch(handleError);
}

export function addPatient(patient) {
  return fetch(`${baseUrl}/AddPatient`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(patient),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function updatePatient(patient) {
  return fetch(`${baseUrl}/UpdatePatient`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(patient),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deletePatient(id) {
  return fetch(`${baseUrl}/DeletePatient/${id}`, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
