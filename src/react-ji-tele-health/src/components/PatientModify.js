import React, { useState, useEffect } from "react";
import * as valuesService from "../api/valuesApiService";

function PatientModify(props) {
  const [patient, setPatient] = useState({});
  const [patientId, setPatientId] = useState(0);
  const [action, setAction] = useState("");
  const [errors, setErrors] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    setPatientId(+props.match.params.id);
    const id = +props.match.params.id;
    if (id !== 0) {
      setAction("Edit");
      valuesService.getPatientById(id).then((data) => setPatient(data));
    } else {
      setAction("Add");
      setPatient({});
    }
  }, [props.match.params.id, patient]);

  function handleChange({ target }) {
    setPatient({
      ...patient,
      [target.name]: target.value,
    });
    setCanSubmit(formIsValid());
  }

  function formIsValid() {
    const _error = {};

    if (!patient.name) _error.title = "Name is required";
    if (!patient.doB) _error.doB = "DoB is required";
    if (!patient.address) _error.category = "Address is required";

    setErrors(_error);

    return Object.keys(_error).length === 0;
  }

  function handleBack(event) {
    props.history.push("/");
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    if (action === "Edit") {
      edit();
    } else {
      add();
    }
  }

  function handleDelete(event) {
    event.preventDefault();

    valuesService.deletePatient(patientId).then(() => {
      handleBack();
    });
  }

  function add() {
    valuesService.addPatient(patient).then(() => {
      handleBack();
    });
  }

  function edit() {
    valuesService.updatePatient(patient).then(() => {
      handleBack();
    });
  }

  return (
    <div className="jumbotron">
      <h1>{action} Patient</h1>
      <div>
        <input
          type="submit"
          value="Back"
          className="btn btn-primary"
          onClick={handleBack}
        />
      </div>
      <form>
        <div className="form-group row">
          <label htmlFor="name" className="col-sm-2 col-form-label required">
            Name
          </label>
          <div className="col-sm-10">
            <input
              id="name"
              type="text"
              name="name"
              onChange={handleChange}
              className="form-control"
              value={patient.name}
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="doB" className="col-sm-2 col-form-label required">
            DoB
          </label>
          <div className="col-sm-10">
            <input
              id="doB"
              type="text"
              name="doB"
              onChange={handleChange}
              className="form-control"
              value={patient.doB}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="address" className="col-sm-2 col-form-label required">
            Address
          </label>
          <div className="col-sm-10">
            <input
              id="address"
              type="text"
              name="address"
              onChange={handleChange}
              className="form-control"
              value={patient.address}
            />
          </div>
        </div>
        <div>
          <input
            type="submit"
            value="Submit"
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={!canSubmit}
          />
          &nbsp;
          <input
            type="submit"
            value="Delete"
            className="btn btn-primary"
            onClick={handleDelete}
          />
        </div>
      </form>
    </div>
  );
}

export default PatientModify;
