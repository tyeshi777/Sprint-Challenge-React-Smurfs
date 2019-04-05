import React, { Component } from "react";

import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";
import axios from "axios";
import { Route, NavLink } from "react-router-dom";

const sourceUrl = "http://localhost:3333";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount() {
    this.getSmurfs();
  }

  getSmurfs() {
    axios
      .get(`${sourceUrl}/smurfs`)
      .then(res => {
        this.setState({ smurfs: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteSmurf = (ev, smurfId) => {
    ev.preventDefault();
    axios
      .delete(`${sourceUrl}/smurfs/${smurfId}`)
      .then(res =>
        this.setState({
          smurfs: res.data
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <nav>
          <h1 className="header">Smurfs Village!!</h1>
          <div className="navLinks">
            <NavLink onClick={() => this.getSmurfs()} to="/">
              Smurfs List!
            </NavLink>
            <NavLink to="/smurf-form">Add Smurf</NavLink>
          </div>
        </nav>
        <Route
          path="/"
          render={props => (
            <Smurfs
              {...props}
              getSmurfs={this.getSmurfs}
              smurfs={this.state.smurfs}
              sourceUrl={sourceUrl}
              deleteSmurf={this.deleteSmurf}
            />
          )}
        />
        <Route
          exact
          path="/smurf-form"
          render={props => (
            <SmurfForm
              {...props}
              sourceUrl={sourceUrl}
              smurfs={this.state.smurfs}
              getSmurfs={this.getSmurfs}
            />
          )}
        />
      </div>
    );
  }
}
export default App;
