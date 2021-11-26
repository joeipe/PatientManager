import React from "react";
import { Route, Switch } from "react-router-dom";
import { NavLink } from "react-router-dom";
import HomePage from "../HomePage";
import ClinicalNotes from "../ClinicalNotes";
import ClinicalNotesModify from "../ClinicalNotesModify";
import PatientModify from "../PatientModify";
import AboutPage from "../AboutPage";
import NotFoundPage from "../NotFoundPage";
import "./App.css";

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <a className="navbar-brand" href="#">
          Patient Manager
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" exact to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/about">
                About
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <main role="main" className="container">
        <div className="starter-template">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/notes/:id" component={ClinicalNotes} />
            <Route
              path="/note/modify/:id/:patientId"
              component={ClinicalNotesModify}
            />
            <Route path="/patient/:id" component={PatientModify} />
            <Route path="/about" component={AboutPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </main>
    </>
  );
}

export default App;
