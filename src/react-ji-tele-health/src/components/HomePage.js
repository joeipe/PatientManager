import React from "react";
import { getPatients } from "../api/valuesApiService";
import { Link } from "react-router-dom";

class HomePage extends React.Component {
  state = {
    patients: [],
  };

  componentDidMount() {
    getPatients().then((data) => this.setState({ patients: data }));
  }

  render() {
    return (
      <div className="jumbotron">
        <h1>Home</h1>
        <h3>
          <span className="badge badge-secondary">Patients</span>
        </h3>
        <div>
          <Link to={`patient/${0}`} className="btn btn-primary">
            Add
          </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>DoB</th>
              <th>Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.patients.map((patient) => {
              return (
                <tr key={patient.id}>
                  <td>
                    <Link to={`patient/${patient.id}`}>{patient.name}</Link>
                  </td>
                  <td>{patient.doB}</td>
                  <td>{patient.address}</td>
                  <td>
                    <Link
                      to={`notes/${patient.id}`}
                      className="btn btn-warning"
                    >
                      Clinical Notes
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
}

export default HomePage;
