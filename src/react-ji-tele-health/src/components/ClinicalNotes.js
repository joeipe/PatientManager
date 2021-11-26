import React, { useState, useEffect } from "react";
import { getPatientById } from "../api/valuesApiService";
import { Link } from "react-router-dom";

function ClinicalNotes(props) {
  const [patient, setPatient] = useState([]);

  useEffect(() => {
    const patientId = props.match.params.id;
    getPatientById(patientId).then((data) => setPatient(data));
  }, []);

  return (
    <div className="jumbotron">
      <h1>Clinical Notes</h1>
      <h5>{patient.name}</h5>
      <h5>{patient.doB}</h5>
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {patient.clinicalNotes?.map((notes) => {
            return (
              <tr key={notes.id}>
                <td>
                  <Link to={`/note/modify/${notes.id}/${patient.id}`}>
                    {notes.description}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ClinicalNotes;
